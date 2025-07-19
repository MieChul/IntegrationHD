using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace HealthDesk.Infrastructure;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IConfiguration configuration)
    {
        var connectionString = "mongodb+srv://mraopagma:Pakku1408@cluster0.ef1nup1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        var databaseName = "healthdesk";
        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }

    public IMongoCollection<T> GetCollection<T>(string collectionName) =>
        _database.GetCollection<T>(collectionName);
}