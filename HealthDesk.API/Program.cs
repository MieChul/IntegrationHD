using AspNetCoreRateLimit;
using HealthDesk.API;
using HealthDesk.Application.Extensions;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

var cultureInfo = new CultureInfo("en-IN");
CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;


var config = builder.Configuration;
var origins = config.GetSection("Cors:AllowedOrigins").Get<string[]>();
const string CorsPolicyName = "_allowedOrigins";


var mongoConn = "mongodb+srv://mraopagma:Pakku1408@cluster0.ef1nup1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var dbName = "healthdesk"; // Replace with your actual DB name

builder.Services.Configure<MongoDbSettings>(opts =>
{
    opts.ConnectionString = mongoConn;
    opts.DatabaseName = dbName;
});

builder.Services.AddSingleton<IMongoClient>(sp =>
    new MongoClient(sp.GetRequiredService<IOptions<MongoDbSettings>>().Value.ConnectionString));

builder.Services.AddScoped<IMongoDatabase>(sp =>
    sp.GetRequiredService<IMongoClient>().GetDatabase(sp.GetRequiredService<IOptions<MongoDbSettings>>().Value.DatabaseName));

builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicyName, p =>
    {
        p.WithOrigins(origins)
         .AllowAnyHeader()
         .AllowAnyMethod()
         .AllowCredentials();
    });
});


builder.Services.AddControllers();
builder.Services.AddCustomValidations();
builder.Services.RegisterServices(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks();
builder.Services.AddResponseCompression();
builder.Services.AddHttpClient();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                context.Token = context.Request.Cookies["AccessToken"];
                return Task.CompletedTask;
            }
        };

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AnyAuthenticated", p => p.RequireAuthenticatedUser());

    options.AddPolicy("AdminOnly", p => p.RequireRole("Admin"));

    options.AddPolicy("HospitalLabPharm_Approved", p =>
        p.RequireRole("Hospital", "Laboratory", "Pharmacy")
         .RequireClaim("status", "Approved"));

    options.AddPolicy("PatientPhysician_Approved", p =>
        p.RequireRole("Patient", "Physician")
         .RequireClaim("status", "Approved"));

    options.AddPolicy("Pharmaceutical_Approved", p =>
        p.RequireRole("Pharmaceutical")
         .RequireClaim("status", "Approved"));
});


builder.Services.Configure<ForwardedHeadersOptions>(opts =>
    opts.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto);

builder.Services.Configure<ApiBehaviorOptions>(opts =>
{
    opts.InvalidModelStateResponseFactory = ctx =>
    {
        var errors = ctx.ModelState
            .Where(e => e.Value.Errors.Count > 0)
            .Select(e => new
            {
                Field = e.Key,
                Errors = e.Value.Errors.Select(x => x.ErrorMessage).ToArray()
            });
        return new BadRequestObjectResult(new
        {
            Message = "Validation Failed",
            Errors = errors
        });
    };
});

builder.Services.Configure<IISServerOptions>(o => o.MaxRequestBodySize = 50 * 1024 * 1024);
builder.Services.Configure<KestrelServerOptions>(o => o.Limits.MaxRequestBodySize = 50 * 1024 * 1024);

builder.Services.AddMemoryCache();
builder.Services.Configure<IpRateLimitOptions>(builder.Configuration.GetSection("IpRateLimiting"));
builder.Services.AddInMemoryRateLimiting();
builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
    app.UseHsts();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHealthChecks("/health");
app.UseResponseCompression();


app.UseStaticFiles();
app.UseForwardedHeaders();
app.UseHttpsRedirection();
app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseMiddleware<SecurityHeadersMiddleware>();

app.UseRouting();
app.UseIpRateLimiting();
app.UseCors(CorsPolicyName);


var prerelease = app.Configuration.GetValue<bool>("PreReleaseAuth:Enabled");
if (prerelease)
{
    app.UseMiddleware<PreReleaseAuthMiddleware>();
}

app.UseMiddleware<TokenRefreshMiddleware>();
app.UseMiddleware<AntiMaliciousDataMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("index.html");

try
{
    app.Run();
}
catch (Exception ex)
{
    Console.WriteLine("Fatal error during app startup: " + ex.Message);
    Console.WriteLine(ex.StackTrace);
    throw;
}