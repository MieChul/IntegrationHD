import {
  MatSelect,
  MatSelectModule
} from "./chunk-7HJNVVGM.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef
} from "./chunk-IU6H75TX.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-4MBJ3B4D.js";
import "./chunk-NUDYKLWU.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-AQODCNJU.js";
import {
  MatFormField,
  MatFormFieldModule,
  MatSuffix
} from "./chunk-AYABBOKV.js";
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  Overlay,
  OverlayModule,
  PortalModule
} from "./chunk-2RZRWM2V.js";
import {
  animate,
  sequence,
  style,
  transition,
  trigger
} from "./chunk-73536OOK.js";
import "./chunk-Y5MN3PSW.js";
import "./chunk-QWR4QDBY.js";
import {
  MAT_FAB_DEFAULT_OPTIONS,
  MatButton,
  MatButtonModule,
  MatIconButton,
  MatMiniFabButton
} from "./chunk-4HFGGKVI.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel
} from "./chunk-DUBWDH4H.js";
import {
  A11yModule,
  CdkTrapFocus,
  MatCommonModule,
  MatOption,
  MatOptionModule,
  Platform,
  coerceBooleanProperty
} from "./chunk-WZNVGTR6.js";
import {
  AsyncPipe,
  CommonModule,
  DOCUMENT,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  NgSwitch,
  NgSwitchCase,
  NgTemplateOutlet,
  SlicePipe
} from "./chunk-YVOA3ONQ.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  Optional,
  Output,
  Pipe,
  ViewChild,
  ViewEncapsulation$1,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵhostProperty,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵpipeBind4,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpropertyInterpolate1,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-KMYTWVBX.js";
import "./chunk-5OPE3T2R.js";
import "./chunk-4N4GOYJH.js";
import {
  BehaviorSubject,
  Subject,
  distinctUntilChanged,
  map,
  shareReplay,
  takeUntil,
  tap
} from "./chunk-FHTVLBLO.js";
import {
  __commonJS,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-ZGWC6NTF.js";

// node_modules/ts-luxon/dist/ts-luxon.umd.js
var require_ts_luxon_umd = __commonJS({
  "node_modules/ts-luxon/dist/ts-luxon.umd.js"(exports, module) {
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object") module.exports = factory();
      else if (typeof define === "function" && define.amd) define("tsLuxon", [], factory);
      else if (typeof exports === "object") exports["tsLuxon"] = factory();
      else root["tsLuxon"] = factory();
    })(exports, () => {
      return (
        /******/
        (() => {
          "use strict";
          var __webpack_modules__ = {
            /***/
            "./src/datetime.ts": (
              /*!*************************!*\
                !*** ./src/datetime.ts ***!
                \*************************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.DateTime = void 0;
                var tslib_1 = __webpack_require__2(
                  /*! tslib */
                  "./node_modules/tslib/tslib.es6.js"
                );
                var duration_1 = __webpack_require__2(
                  /*! ./duration */
                  "./src/duration.ts"
                );
                var interval_1 = __webpack_require__2(
                  /*! ./interval */
                  "./src/interval.ts"
                );
                var settings_1 = __webpack_require__2(
                  /*! ./settings */
                  "./src/settings.ts"
                );
                var info_1 = __webpack_require__2(
                  /*! ./info */
                  "./src/info.ts"
                );
                var formatter_1 = __webpack_require__2(
                  /*! ./impl/formatter */
                  "./src/impl/formatter.ts"
                );
                var fixedOffsetZone_1 = __webpack_require__2(
                  /*! ./zones/fixedOffsetZone */
                  "./src/zones/fixedOffsetZone.ts"
                );
                var locale_1 = __webpack_require__2(
                  /*! ./impl/locale */
                  "./src/impl/locale.ts"
                );
                var util_1 = __webpack_require__2(
                  /*! ./impl/util */
                  "./src/impl/util.ts"
                );
                var zoneUtil_1 = __webpack_require__2(
                  /*! ./impl/zoneUtil */
                  "./src/impl/zoneUtil.ts"
                );
                var diff_1 = __webpack_require__2(
                  /*! ./impl/diff */
                  "./src/impl/diff.ts"
                );
                var regexParser_1 = __webpack_require__2(
                  /*! ./impl/regexParser */
                  "./src/impl/regexParser.ts"
                );
                var tokenParser_1 = __webpack_require__2(
                  /*! ./impl/tokenParser */
                  "./src/impl/tokenParser.ts"
                );
                var conversions_1 = __webpack_require__2(
                  /*! ./impl/conversions */
                  "./src/impl/conversions.ts"
                );
                var Formats = tslib_1.__importStar(__webpack_require__2(
                  /*! ./impl/formats */
                  "./src/impl/formats.ts"
                ));
                var errors_1 = __webpack_require__2(
                  /*! ./errors */
                  "./src/errors.ts"
                );
                var invalid_1 = __webpack_require__2(
                  /*! ./types/invalid */
                  "./src/types/invalid.ts"
                );
                var INVALID = "Invalid DateTime";
                var MAX_DATE = 864e13;
                function fixOffset(localTS, o, tz) {
                  var utcGuess = localTS - o * 60 * 1e3;
                  var o2 = tz.offset(utcGuess);
                  if (o === o2) {
                    return [utcGuess, o];
                  }
                  utcGuess -= (o2 - o) * 60 * 1e3;
                  var o3 = tz.offset(utcGuess);
                  if (o2 === o3) {
                    return [utcGuess, o2];
                  }
                  return [localTS - Math.min(o2, o3) * 60 * 1e3, Math.max(o2, o3)];
                }
                function tsToObj(ts, offset) {
                  ts += offset * 60 * 1e3;
                  var d = new Date(ts);
                  return {
                    year: d.getUTCFullYear(),
                    month: d.getUTCMonth() + 1,
                    day: d.getUTCDate(),
                    hour: d.getUTCHours(),
                    minute: d.getUTCMinutes(),
                    second: d.getUTCSeconds(),
                    millisecond: d.getUTCMilliseconds()
                  };
                }
                function objToTS(obj, offset, zone) {
                  return fixOffset((0, util_1.objToLocalTS)(obj), offset, zone);
                }
                function parseDataToDateTime(parsed, parsedZone, opts, format, text, specificOffset) {
                  var setZone = opts.setZone, zone = opts.zone;
                  if (parsed && Object.keys(parsed).length !== 0 || parsedZone) {
                    var interpretationZone = parsedZone || zone;
                    var inst = DateTime2.fromObject(parsed || void 0, tslib_1.__assign(tslib_1.__assign({}, opts), {
                      zone: interpretationZone,
                      specificOffset
                    }));
                    return setZone ? inst : inst.setZone(zone);
                  } else {
                    return DateTime2.invalid(new invalid_1.Invalid("unparsable", 'the input "'.concat(text, `" can't be parsed as `).concat(format)));
                  }
                }
                function toTechFormat(dt, format, allowZ) {
                  if (allowZ === void 0) {
                    allowZ = true;
                  }
                  return dt.isValid ? formatter_1.Formatter.create(locale_1.Locale.create("en-US"), {
                    allowZ,
                    forceSimple: true
                  }).formatDateTimeFromString(dt, format) : null;
                }
                var defaultUnitValues = {
                  year: 0,
                  // unused value
                  month: 1,
                  day: 1,
                  hour: 0,
                  minute: 0,
                  second: 0,
                  millisecond: 0
                }, defaultWeekUnitValues = {
                  weekNumber: 1,
                  weekday: 1,
                  hour: 0,
                  minute: 0,
                  second: 0,
                  millisecond: 0
                }, defaultOrdinalUnitValues = {
                  ordinal: 1,
                  hour: 0,
                  minute: 0,
                  second: 0,
                  millisecond: 0
                };
                var orderedUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"], orderedWeekUnits = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"], orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
                function normalizeUnit(unit) {
                  var normalized = util_1.PLURAL_MAPPING[unit.toLowerCase()];
                  if (!normalized) {
                    throw new errors_1.InvalidUnitError(unit);
                  }
                  return normalized;
                }
                var DateTime2 = (
                  /** @class */
                  function() {
                    function DateTime3(config2) {
                      var _a;
                      var zone = config2.zone || settings_1.Settings.defaultZone;
                      var invalid = config2.invalid || // invalid timestamp can happen when using plus or minus with 1E8 days resulting in overflows
                      (Number.isNaN(config2.ts) ? new invalid_1.Invalid("invalid timestamp") : null) || (!zone.isValid ? DateTime3._unsupportedZone(zone) : null);
                      this._ts = (0, util_1.isUndefined)(config2.ts) ? settings_1.Settings.now() : config2.ts;
                      var o, c;
                      if (!invalid) {
                        var unchanged = !!config2.old && config2.old.ts === this._ts && config2.old.zone.equals(zone);
                        if (unchanged) {
                          _a = [config2.old.c, config2.old.o], c = _a[0], o = _a[1];
                        } else {
                          var ot = (0, util_1.isNumber)(config2.o) && !config2.old ? config2.o : zone.offset(this.ts);
                          c = tsToObj(this._ts, ot);
                          invalid = Number.isNaN(c.year) ? new invalid_1.Invalid("invalid input") : null;
                          c = invalid ? void 0 : c;
                          o = invalid ? void 0 : ot;
                        }
                      }
                      this._zone = zone;
                      this._loc = config2.loc || locale_1.Locale.create();
                      this._invalid = invalid;
                      this._weekData = null;
                      this._c = c;
                      this._o = o;
                      this._isLuxonDateTime = true;
                    }
                    Object.defineProperty(DateTime3.prototype, "day", {
                      /**
                       * Get the day of the month (1-30ish).
                       * @example DateTime.local(2017, 5, 25).day //=> 25
                       */
                      get: function() {
                        return this.isValid ? this._c.day : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "daysInMonth", {
                      /**
                       * Returns the number of days in this DateTime's month
                       * @example DateTime.local(2016, 2).daysInMonth //=> 29
                       * @example DateTime.local(2016, 3).daysInMonth //=> 31
                       */
                      get: function() {
                        return (0, util_1.daysInMonth)(this.year, this.month);
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "daysInYear", {
                      /**
                       * Returns the number of days in this DateTime's year
                       * @example DateTime.local(2016).daysInYear //=> 366
                       * @example DateTime.local(2013).daysInYear //=> 365
                       */
                      get: function() {
                        return this.isValid ? (0, util_1.daysInYear)(this.year) : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "hour", {
                      /**
                       * Get the hour of the day (0-23).
                       * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
                       */
                      get: function() {
                        return this.isValid ? this._c.hour : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "invalidExplanation", {
                      /**
                       * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
                       */
                      get: function() {
                        return this._invalid ? this._invalid.explanation : void 0;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "invalidReason", {
                      /**
                       * Returns an error code if this Duration became invalid, or null if the Duration is valid
                       */
                      get: function() {
                        return this._invalid ? this._invalid.reason : void 0;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "isInDST", {
                      /**
                       * Get whether the DateTime is in a DST.
                       */
                      get: function() {
                        if (this.isOffsetFixed) {
                          return false;
                        } else {
                          return this.offset > this.set({
                            month: 1,
                            day: 1
                          }).offset || this.offset > this.set({
                            month: 5
                          }).offset;
                        }
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "isInLeapYear", {
                      /**
                       * Returns true if this DateTime is in a leap year, false otherwise
                       * @example DateTime.local(2016).isInLeapYear //=> true
                       * @example DateTime.local(2013).isInLeapYear //=> false
                       */
                      get: function() {
                        return (0, util_1.isLeapYear)(this.year);
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "isOffsetFixed", {
                      /**
                       * Get whether this zone's offset ever changes, as in a DST.
                       */
                      get: function() {
                        return this.isValid ? this.zone.isUniversal : null;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "isValid", {
                      /**
                       * Returns whether the DateTime is valid. Invalid DateTimes occur when:
                       * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
                       * * The DateTime was created by an operation on another invalid date
                       */
                      get: function() {
                        return this._invalid === null;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "isWeekend", {
                      /**
                       * Returns true if this date is on a weekend according to the locale, false otherwise
                       * @returns {boolean}
                       */
                      get: function() {
                        return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "loc", {
                      /**
                       * Get a clone of the Locale instance of a DateTime.
                       */
                      get: function() {
                        return this.isValid ? this._loc.clone() : void 0;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "localWeekNumber", {
                      /**
                       * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
                       * because the week can start on different days of the week (see localWeekday) and because a different number of days
                       * is required for a week to count as the first week of a year.
                       */
                      get: function() {
                        return this.isValid ? this._possiblyCachedLocalWeekData(this).weekNumber : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "localWeekYear", {
                      /**
                       * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
                       * differently, see localWeekNumber.
                       */
                      get: function() {
                        return this.isValid ? this._possiblyCachedLocalWeekData(this).weekYear : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "localWeekday", {
                      /**
                       * Get the day of the week according to the locale.
                       * 1 is the first day of the week and 7 is the last day of the week.
                       * If the locale assigns Sunday as the first day of the week, then a date which is a Sunday will return 1,
                       */
                      get: function() {
                        return this.isValid ? this._possiblyCachedLocalWeekData(this).weekday : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "locale", {
                      /**
                       * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
                       */
                      get: function() {
                        return this.isValid ? this._loc.locale : void 0;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "millisecond", {
                      /**
                       * Get the millisecond of the second (0-999).
                       * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
                       */
                      get: function() {
                        return this.isValid ? this._c.millisecond : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "minute", {
                      /**
                       * Get the minute of the hour (0-59).
                       * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
                       */
                      get: function() {
                        return this.isValid ? this._c.minute : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "month", {
                      /**
                       * Get the month (1-12).
                       * @example DateTime.local(2017, 5, 25).month //=> 5
                       */
                      get: function() {
                        return this.isValid ? this._c.month : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "monthLong", {
                      /**
                       * Get the human-readable long month name, such as 'October'.
                       * Defaults to the system's locale if no locale has been specified
                       * @example DateTime.local(2017, 10, 30).monthLong //=> October
                       */
                      get: function() {
                        return this.isValid ? info_1.Info.months("long", {
                          locObj: this._loc
                        })[this.month - 1] : null;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "monthShort", {
                      /**
                       * Get the human-readable short month name, such as 'Oct'.
                       * Defaults to the system's locale if no locale has been specified
                       * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
                       */
                      get: function() {
                        return this.isValid ? info_1.Info.months("short", {
                          locObj: this._loc
                        })[this.month - 1] : null;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "numberingSystem", {
                      /**
                       * Get the numbering system of a DateTime, such as "beng". The numbering system is used when formatting the DateTime
                       */
                      get: function() {
                        return this.isValid ? this._loc.numberingSystem : void 0;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "offset", {
                      /**
                       * Get the UTC offset of this DateTime in minutes
                       * @example DateTime.now().offset //=> -240
                       * @example DateTime.utc().offset //=> 0
                       */
                      get: function() {
                        return this.isValid ? +this._o : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "offsetNameLong", {
                      /**
                       * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
                       * Defaults to the system's locale if no locale has been specified
                       */
                      get: function() {
                        if (!this.isValid) {
                          return null;
                        }
                        return this.zone.offsetName(this._ts, {
                          format: "long",
                          locale: this.locale
                        });
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "offsetNameShort", {
                      /**
                       * Get the short human name for the zone's current offset, for example "EST" or "EDT".
                       * Defaults to the system's locale if no locale has been specified
                       */
                      get: function() {
                        if (!this.isValid) {
                          return null;
                        }
                        return this.zone.offsetName(this._ts, {
                          format: "short",
                          locale: this.locale
                        });
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "ordinal", {
                      /**
                       * Get the ordinal (meaning the day of the year)
                       * @example DateTime.local(2017, 5, 25).ordinal //=> 145
                       */
                      get: function() {
                        return this.isValid ? (0, conversions_1.gregorianToOrdinal)(this._c).ordinal : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "outputCalendar", {
                      /**
                       * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
                       */
                      get: function() {
                        return this.isValid ? this._loc.outputCalendar : void 0;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "quarter", {
                      /**
                       * Get the quarter
                       * @example DateTime.local(2017, 5, 25).quarter //=> 2
                       */
                      get: function() {
                        return this.isValid ? Math.ceil(this._c.month / 3) : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "second", {
                      /**
                       * Get the second of the minute (0-59).
                       * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
                       */
                      get: function() {
                        return this.isValid ? this._c.second : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "ts", {
                      /**
                       * Get the timestamp.
                       * @example DateTime.local(1970, 1, 1, 0, 0, 0, 654).ts //=> 654
                       */
                      get: function() {
                        return this._ts;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "weekNumber", {
                      /**
                       * Get the week number of the week year (1-52ish).
                       * @see https://en.wikipedia.org/wiki/ISO_week_date
                       * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
                       */
                      get: function() {
                        return this.isValid ? this._possiblyCachedWeekData(this).weekNumber : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "weekYear", {
                      /**
                       * Get the week year
                       * @see https://en.wikipedia.org/wiki/ISO_week_date
                       * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
                       */
                      get: function() {
                        return this.isValid ? this._possiblyCachedWeekData(this).weekYear : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "weekday", {
                      /**
                       * Get the day of the week.
                       * 1 is Monday and 7 is Sunday
                       * @see https://en.wikipedia.org/wiki/ISO_week_date
                       * @example DateTime.local(2014, 11, 31).weekday //=> 4
                       */
                      get: function() {
                        return this.isValid ? this._possiblyCachedWeekData(this).weekday : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "weekdayLong", {
                      /**
                       * Get the human-readable long weekday, such as 'Monday'.
                       * Defaults to the system's locale if no locale has been specified
                       * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
                       */
                      get: function() {
                        return this.isValid ? info_1.Info.weekdays("long", {
                          locObj: this._loc
                        })[this.weekday - 1] : null;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "weekdayShort", {
                      /**
                       * Get the human-readable short weekday, such as 'Mon'.
                       * Defaults to the system's locale if no locale has been specified
                       * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
                       */
                      get: function() {
                        return this.isValid ? info_1.Info.weekdays("short", {
                          locObj: this._loc
                        })[this.weekday - 1] : null;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "weeksInLocalWeekYear", {
                      /**
                       * Returns the number of weeks in this DateTime's local week year
                       * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
                       * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
                       * @type {number}
                       */
                      get: function() {
                        return this.isValid ? (0, util_1.weeksInWeekYear)(this.localWeekYear, this.loc.getMinDaysInFirstWeek(), this.loc.getStartOfWeek()) : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "weeksInWeekYear", {
                      /**
                       * Returns the number of weeks in this DateTime's year
                       * @see https://en.wikipedia.org/wiki/ISO_week_date
                       * @example DateTime.local(2004).weeksInWeekYear //=> 53
                       * @example DateTime.local(2013).weeksInWeekYear //=> 52
                       */
                      get: function() {
                        return this.isValid ? (0, util_1.weeksInWeekYear)(this.weekYear) : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "year", {
                      /**
                       * Get the year
                       * @example DateTime.local(2017, 5, 25).year //=> 2017
                       */
                      get: function() {
                        return this.isValid ? this._c.year : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "zone", {
                      /**
                       * Get the time zone associated with this DateTime.
                       */
                      get: function() {
                        return this._zone;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(DateTime3.prototype, "zoneName", {
                      /**
                       * Get the name of the time zone.
                       */
                      get: function() {
                        return this.isValid ? this.zone.name : null;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    DateTime3.buildFormatParser = function(fmt, options) {
                      if (options === void 0) {
                        options = {};
                      }
                      var _a = options.locale, locale = _a === void 0 ? null : _a, _b = options.numberingSystem, numberingSystem = _b === void 0 ? null : _b, localeToUse = locale_1.Locale.fromOpts({
                        locale,
                        numberingSystem,
                        defaultToEN: true
                      });
                      return new tokenParser_1.TokenParser(localeToUse, fmt);
                    };
                    DateTime3.expandFormat = function(fmt, localeOpts) {
                      if (localeOpts === void 0) {
                        localeOpts = {};
                      }
                      var expanded = (0, tokenParser_1.expandMacroTokens)(formatter_1.Formatter.parseFormat(fmt), locale_1.Locale.fromObject(localeOpts));
                      return expanded.map(function(t) {
                        return t.val;
                      }).join("");
                    };
                    DateTime3.fromFormat = function(text, fmt, opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      if ((0, util_1.isUndefined)(text) || (0, util_1.isUndefined)(fmt)) {
                        throw new errors_1.InvalidArgumentError("fromFormat requires an input string and a format");
                      }
                      var locale = opts.locale, numberingSystem = opts.numberingSystem, localeToUse = locale_1.Locale.fromOpts({
                        locale,
                        numberingSystem,
                        defaultToEN: true
                      }), _a = (0, tokenParser_1.parseFromTokens)(localeToUse, text, fmt), vals = _a[0], parsedZone = _a[1], specificOffset = _a[2], invalid = _a[3];
                      if (invalid) {
                        return DateTime3.invalid(invalid);
                      } else {
                        return parseDataToDateTime(vals, parsedZone || null, opts, "format ".concat(fmt), text, specificOffset);
                      }
                    };
                    DateTime3.fromFormatExplain = function(text, fmt, options) {
                      if (options === void 0) {
                        options = {};
                      }
                      var locale = options.locale, numberingSystem = options.numberingSystem, localeToUse = locale_1.Locale.fromOpts({
                        locale,
                        numberingSystem,
                        defaultToEN: true
                      });
                      return (0, tokenParser_1.explainFromTokens)(localeToUse, text, fmt);
                    };
                    DateTime3.fromFormatParser = function(text, formatParser, opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      if ((0, util_1.isUndefined)(text) || (0, util_1.isUndefined)(formatParser)) {
                        throw new errors_1.InvalidArgumentError("fromFormatParser requires an input string and a format parser");
                      }
                      var _a = opts.locale, locale = _a === void 0 ? null : _a, _b = opts.numberingSystem, numberingSystem = _b === void 0 ? null : _b, localeToUse = locale_1.Locale.fromOpts({
                        locale,
                        numberingSystem,
                        defaultToEN: true
                      });
                      if (!localeToUse.equals(formatParser.locale)) {
                        throw new errors_1.InvalidArgumentError("fromFormatParser called with a locale of ".concat(localeToUse, ", ") + "but the format parser was created for ".concat(formatParser.locale));
                      }
                      var _d = formatParser.explainFromTokens(text), result = _d.result, zone = _d.zone, specificOffset = _d.specificOffset, invalidReason = _d.invalidReason;
                      if (invalidReason) {
                        return DateTime3.invalid(invalidReason);
                      } else {
                        return parseDataToDateTime(result, zone, opts, "format ".concat(formatParser.format), text, specificOffset);
                      }
                    };
                    DateTime3.fromHTTP = function(text, opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      var _a = (0, regexParser_1.parseHTTPDate)(text), vals = _a[0], parsedZone = _a[1];
                      return parseDataToDateTime(vals, parsedZone, opts, "HTTP", text);
                    };
                    DateTime3.fromISO = function(text, opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      var _a = (0, regexParser_1.parseISODate)(text), vals = _a[0], parsedZone = _a[1];
                      return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
                    };
                    DateTime3.fromJSDate = function(date, options) {
                      if (options === void 0) {
                        options = {};
                      }
                      var ts = (0, util_1.isDate)(date) ? date.valueOf() : NaN;
                      if (Number.isNaN(ts)) {
                        return DateTime3.invalid("invalid input");
                      }
                      var zoneToUse = (0, zoneUtil_1.normalizeZone)(options.zone, settings_1.Settings.defaultZone);
                      if (!zoneToUse.isValid) {
                        return DateTime3.invalid(DateTime3._unsupportedZone(zoneToUse));
                      }
                      return new DateTime3({
                        ts,
                        zone: zoneToUse,
                        loc: locale_1.Locale.fromObject(options)
                      });
                    };
                    DateTime3.fromMillis = function(milliseconds, options) {
                      if (options === void 0) {
                        options = {};
                      }
                      if (!(0, util_1.isNumber)(milliseconds)) {
                        throw new errors_1.InvalidArgumentError("fromMillis requires a numerical input, but received a ".concat(typeof milliseconds, " with value ").concat(milliseconds));
                      } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
                        return DateTime3.invalid("Timestamp out of range");
                      } else {
                        return new DateTime3({
                          ts: milliseconds,
                          zone: (0, zoneUtil_1.normalizeZone)(options.zone, settings_1.Settings.defaultZone),
                          loc: locale_1.Locale.fromObject(options)
                        });
                      }
                    };
                    DateTime3.fromObject = function(obj, opts) {
                      if (obj === void 0) {
                        obj = {};
                      }
                      if (opts === void 0) {
                        opts = {};
                      }
                      var zoneToUse = (0, zoneUtil_1.normalizeZone)(opts.zone, settings_1.Settings.defaultZone);
                      if (!zoneToUse.isValid) {
                        return DateTime3.invalid(DateTime3._unsupportedZone(zoneToUse));
                      }
                      var loc = locale_1.Locale.fromObject(opts);
                      var normalized = (0, util_1.normalizeObject)(obj, normalizeUnit);
                      var tsNow = settings_1.Settings.now(), offsetProvis = (0, util_1.isNumber)(opts.specificOffset) ? opts.specificOffset : zoneToUse.offset(tsNow), containsOrdinal = (0, util_1.isDefined)(normalized.ordinal), containsGregorYear = (0, util_1.isDefined)(normalized.year), containsGregorMD = (0, util_1.isDefined)(normalized.month) || (0, util_1.isDefined)(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
                      if ((containsGregor || containsOrdinal) && definiteWeekDef) {
                        throw new errors_1.ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
                      }
                      if (containsGregorMD && containsOrdinal) {
                        throw new errors_1.ConflictingSpecificationError("Can't mix ordinal dates with month/day");
                      }
                      var useWeekData = definiteWeekDef || normalized.weekday && !containsGregor;
                      var _a = (0, conversions_1.usesLocalWeekValues)(normalized, loc), minDaysInFirstWeek = _a.minDaysInFirstWeek, startOfWeek = _a.startOfWeek;
                      var tmpNow = tsToObj(tsNow, offsetProvis);
                      var config2 = {
                        containsGregor,
                        containsOrdinal,
                        loc,
                        normalized,
                        obj,
                        offsetProvis,
                        useWeekData,
                        zoneToUse
                      };
                      if (useWeekData) {
                        return DateTime3._buildObject(config2, orderedWeekUnits, defaultWeekUnitValues, (0, conversions_1.gregorianToWeek)(tmpNow, minDaysInFirstWeek, startOfWeek));
                      } else if (containsOrdinal) {
                        return DateTime3._buildObject(config2, orderedOrdinalUnits, defaultOrdinalUnitValues, (0, conversions_1.gregorianToOrdinal)(tmpNow));
                      } else {
                        return DateTime3._buildObject(config2, orderedUnits, defaultUnitValues, tmpNow);
                      }
                    };
                    DateTime3.fromRFC2822 = function(text, opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      var _a = (0, regexParser_1.parseRFC2822Date)(text), vals = _a[0], parsedZone = _a[1];
                      return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
                    };
                    DateTime3.fromSQL = function(text, opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      var _a = (0, regexParser_1.parseSQL)(text), vals = _a[0], parsedZone = _a[1];
                      return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
                    };
                    DateTime3.fromSeconds = function(seconds, options) {
                      if (options === void 0) {
                        options = {};
                      }
                      if (!(0, util_1.isNumber)(seconds)) {
                        throw new errors_1.InvalidArgumentError("fromSeconds requires a numerical input");
                      }
                      return new DateTime3({
                        ts: seconds * 1e3,
                        zone: (0, zoneUtil_1.normalizeZone)(options.zone, settings_1.Settings.defaultZone),
                        loc: locale_1.Locale.fromObject(options)
                      });
                    };
                    DateTime3.fromString = function(text, fmt, opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      return DateTime3.fromFormat(text, fmt, opts);
                    };
                    DateTime3.fromStringExplain = function(text, fmt, options) {
                      if (options === void 0) {
                        options = {};
                      }
                      return DateTime3.fromFormatExplain(text, fmt, options);
                    };
                    DateTime3.invalid = function(reason, explanation) {
                      if (!reason) {
                        throw new errors_1.InvalidArgumentError("need to specify a reason the DateTime is invalid");
                      }
                      var invalid = reason instanceof invalid_1.Invalid ? reason : new invalid_1.Invalid(reason, explanation);
                      if (settings_1.Settings.throwOnInvalid) {
                        throw new errors_1.InvalidDateTimeError(invalid);
                      }
                      return new DateTime3({
                        invalid
                      });
                    };
                    DateTime3.isDateTime = function(o) {
                      return !!(o && o._isLuxonDateTime);
                    };
                    DateTime3.local = function() {
                      var args = [];
                      for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                      }
                      var _a = this._lastOpts(args), opts = _a[0], dateValues = _a[1];
                      var year = dateValues[0], month = dateValues[1], day = dateValues[2], hour = dateValues[3], minute = dateValues[4], second = dateValues[5], millisecond = dateValues[6];
                      return DateTime3._quickDT({
                        year,
                        month,
                        day,
                        hour,
                        minute,
                        second,
                        millisecond
                      }, opts);
                    };
                    DateTime3.max = function() {
                      var dateTimes = [];
                      for (var _i = 0; _i < arguments.length; _i++) {
                        dateTimes[_i] = arguments[_i];
                      }
                      if (!dateTimes.every(DateTime3.isDateTime)) {
                        throw new errors_1.InvalidArgumentError("max requires all arguments be DateTimes");
                      }
                      return (0, util_1.bestBy)(dateTimes, function(i) {
                        return i.valueOf();
                      }, Math.max);
                    };
                    DateTime3.min = function() {
                      var dateTimes = [];
                      for (var _i = 0; _i < arguments.length; _i++) {
                        dateTimes[_i] = arguments[_i];
                      }
                      if (!dateTimes.every(DateTime3.isDateTime)) {
                        throw new errors_1.InvalidArgumentError("min requires all arguments be DateTimes");
                      }
                      return (0, util_1.bestBy)(dateTimes, function(i) {
                        return i.valueOf();
                      }, Math.min);
                    };
                    DateTime3.now = function() {
                      return new DateTime3({});
                    };
                    DateTime3.parseFormatForOpts = function(formatOpts, localeOpts) {
                      if (localeOpts === void 0) {
                        localeOpts = {};
                      }
                      var tokenList = (0, tokenParser_1.formatOptsToTokens)(formatOpts, locale_1.Locale.fromObject(localeOpts));
                      return !tokenList ? null : tokenList.map(function(t) {
                        return t ? t.val : null;
                      }).join("");
                    };
                    DateTime3.resetCache = function() {
                      this._zoneOffsetTs = void 0;
                      this._zoneOffsetGuessCache = /* @__PURE__ */ new Map();
                    };
                    DateTime3.utc = function() {
                      var args = [];
                      for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                      }
                      var _a = this._lastOpts(args), opts = _a[0], dateValues = _a[1];
                      var year = dateValues[0], month = dateValues[1], day = dateValues[2], hour = dateValues[3], minute = dateValues[4], second = dateValues[5], millisecond = dateValues[6];
                      opts.zone = fixedOffsetZone_1.FixedOffsetZone.utcInstance;
                      return this._quickDT({
                        year,
                        month,
                        day,
                        hour,
                        minute,
                        second,
                        millisecond
                      }, opts);
                    };
                    DateTime3._buildObject = function(config2, units, defaultValues, objNow) {
                      var foundFirst = false;
                      units.forEach(function(u) {
                        var v = config2.normalized[u];
                        if ((0, util_1.isDefined)(v)) {
                          foundFirst = true;
                        } else if (foundFirst) {
                          config2.normalized[u] = defaultValues[u];
                        } else {
                          config2.normalized[u] = objNow[u];
                        }
                      });
                      var higherOrderInvalid = config2.useWeekData ? (0, conversions_1.hasInvalidWeekData)(config2.normalized) : config2.containsOrdinal ? (0, conversions_1.hasInvalidOrdinalData)(config2.normalized) : (0, conversions_1.hasInvalidGregorianData)(config2.normalized);
                      var invalid = higherOrderInvalid || (0, conversions_1.hasInvalidTimeData)(config2.normalized);
                      if (invalid) {
                        return DateTime3.invalid(invalid);
                      }
                      var gregorian = config2.useWeekData ? (0, conversions_1.weekToGregorian)(config2.normalized) : config2.containsOrdinal ? (0, conversions_1.ordinalToGregorian)(config2.normalized) : config2.normalized, _a = objToTS(gregorian, config2.offsetProvis, config2.zoneToUse), tsFinal = _a[0], offsetFinal = _a[1], inst = new DateTime3({
                        ts: tsFinal,
                        zone: config2.zoneToUse,
                        o: offsetFinal,
                        loc: config2.loc
                      });
                      if (config2.normalized.weekday && config2.containsGregor && config2.obj.weekday !== inst.weekday) {
                        return DateTime3.invalid("mismatched weekday", "you can't specify both a weekday of ".concat(config2.normalized.weekday, " and a date of ").concat(inst.toISO()));
                      }
                      if (!inst.isValid) {
                        return DateTime3.invalid(inst._invalid);
                      }
                      return inst;
                    };
                    DateTime3._diffRelative = function(start, end, opts) {
                      var round = (0, util_1.isUndefined)(opts.round) ? true : opts.round, format = function(c, unit2) {
                        c = (0, util_1.roundTo)(c, round || opts.calendary ? 0 : 2, true);
                        var formatter = end._loc.clone(opts).relFormatter(opts);
                        return formatter.format(c, unit2);
                      }, differ = function(unit2) {
                        if (opts.calendary) {
                          if (!end.hasSame(start, unit2)) {
                            return end.startOf(unit2).diff(start.startOf(unit2), unit2).get(unit2);
                          }
                          return 0;
                        }
                        return end.diff(start, unit2).get(unit2);
                      };
                      if (opts.unit) {
                        return format(differ(opts.unit), opts.unit);
                      }
                      for (var _i = 0, _a = opts.units; _i < _a.length; _i++) {
                        var unit = _a[_i];
                        var count = differ(unit);
                        if (Math.abs(count) >= 1) {
                          return format(count, unit);
                        }
                      }
                      return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
                    };
                    DateTime3._guessOffsetForZone = function(zone) {
                      if (!this._zoneOffsetGuessCache.has(zone)) {
                        if (this._zoneOffsetTs === void 0) {
                          this._zoneOffsetTs = settings_1.Settings.now();
                        }
                        this._zoneOffsetGuessCache.set(zone, zone.offset(this._zoneOffsetTs));
                      }
                      return this._zoneOffsetGuessCache.get(zone);
                    };
                    DateTime3._lastOpts = function(argList) {
                      var opts = {}, args;
                      if (argList.length > 0 && typeof argList[argList.length - 1] === "object") {
                        opts = argList.pop();
                        args = argList;
                      } else {
                        args = Array.from(argList);
                      }
                      return [opts, args];
                    };
                    DateTime3._quickDT = function(obj, opts) {
                      var _a;
                      var zone = (0, zoneUtil_1.normalizeZone)(opts.zone, settings_1.Settings.defaultZone);
                      if (!zone.isValid) {
                        return DateTime3.invalid(this._unsupportedZone(zone));
                      }
                      var loc = locale_1.Locale.fromObject(opts);
                      var tsNow = settings_1.Settings.now();
                      var ts, o;
                      if ((0, util_1.isDefined)(obj.year)) {
                        for (var _i = 0, orderedUnits_1 = orderedUnits; _i < orderedUnits_1.length; _i++) {
                          var u = orderedUnits_1[_i];
                          if ((0, util_1.isUndefined)(obj[u])) {
                            obj[u] = defaultUnitValues[u];
                          }
                        }
                        var invalid = (0, conversions_1.hasInvalidGregorianData)(obj) || (0, conversions_1.hasInvalidTimeData)(obj);
                        if (invalid) {
                          return DateTime3.invalid(invalid);
                        }
                        var offsetProvis = this._guessOffsetForZone(zone);
                        _a = objToTS(obj, offsetProvis, zone), ts = _a[0], o = _a[1];
                      } else {
                        ts = tsNow;
                      }
                      return new DateTime3({
                        ts,
                        zone,
                        loc,
                        o
                      });
                    };
                    DateTime3._unsupportedZone = function(zone) {
                      return new invalid_1.Invalid("unsupported zone", 'the zone "'.concat(zone.name, '" is not supported'));
                    };
                    DateTime3.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
                      if (this.isValid) {
                        return "DateTime { ts: ".concat(this.toISO(), ", zone: ").concat(this.zone.name, ", locale: ").concat(this.locale, " }");
                      } else {
                        return "DateTime { Invalid, reason: ".concat(this.invalidReason, " }");
                      }
                    };
                    DateTime3.prototype.diff = function(otherDateTime, unit, opts) {
                      if (unit === void 0) {
                        unit = "milliseconds";
                      }
                      if (opts === void 0) {
                        opts = {};
                      }
                      if (!this.isValid || !otherDateTime.isValid) {
                        var reason = this.invalidReason || otherDateTime.invalidReason;
                        return duration_1.Duration.invalid(reason, "created by diffing an invalid DateTime");
                      }
                      var units = (0, util_1.maybeArray)(unit).map(duration_1.Duration.normalizeUnit), otherIsLater = otherDateTime.valueOf() > this.valueOf(), earlier = otherIsLater ? this : otherDateTime, later = otherIsLater ? otherDateTime : this, diffed = (0, diff_1.diff)(earlier, later, units, tslib_1.__assign({
                        locale: this.locale,
                        numberingSystem: this.numberingSystem
                      }, opts));
                      return otherIsLater ? diffed.negate() : diffed;
                    };
                    DateTime3.prototype.diffNow = function(unit, opts) {
                      if (unit === void 0) {
                        unit = "milliseconds";
                      }
                      if (opts === void 0) {
                        opts = {};
                      }
                      return this.diff(DateTime3.now(), unit, opts);
                    };
                    DateTime3.prototype.endOf = function(unit, _a) {
                      var _b;
                      var _d = _a === void 0 ? {} : _a, _e = _d.useLocaleWeeks, useLocaleWeeks = _e === void 0 ? false : _e;
                      return this.plus((_b = {}, _b[unit] = 1, _b)).startOf(unit, {
                        useLocaleWeeks
                      }).minus({
                        milliseconds: 1
                      });
                    };
                    DateTime3.prototype.equals = function(other) {
                      return this.valueOf() === other.valueOf() && this.zone.equals(other.zone) && this._loc.equals(other._loc);
                    };
                    DateTime3.prototype.get = function(unit) {
                      return this[unit];
                    };
                    DateTime3.prototype.getPossibleOffsets = function() {
                      if (!this.isValid || this.isOffsetFixed) {
                        return [this];
                      }
                      var dayMs = 864e5;
                      var minuteMs = 6e4;
                      var localTS = (0, util_1.objToLocalTS)(this._c);
                      var oEarlier = this.zone.offset(localTS - dayMs);
                      var oLater = this.zone.offset(localTS + dayMs);
                      var o1 = this.zone.offset(localTS - oEarlier * minuteMs);
                      var o2 = this.zone.offset(localTS - oLater * minuteMs);
                      if (o1 === o2) {
                        return [this];
                      }
                      var ts1 = localTS - o1 * minuteMs;
                      var ts2 = localTS - o2 * minuteMs;
                      var c1 = tsToObj(ts1, o1);
                      var c2 = tsToObj(ts2, o2);
                      if (c1.hour === c2.hour && c1.minute === c2.minute && c1.second === c2.second && c1.millisecond === c2.millisecond) {
                        return [this._clone({
                          ts: ts1
                        }), this._clone({
                          ts: ts2
                        })];
                      }
                      return [this];
                    };
                    DateTime3.prototype.hasSame = function(otherDateTime, unit, opts) {
                      if (!this.isValid) {
                        return false;
                      }
                      var inputMs = otherDateTime.valueOf();
                      var adjustedToZone = this.setZone(otherDateTime.zone, {
                        keepLocalTime: true
                      });
                      return +adjustedToZone.startOf(unit) <= inputMs && inputMs <= +adjustedToZone.endOf(unit, opts);
                    };
                    DateTime3.prototype.minus = function(duration) {
                      if (!this.isValid) {
                        return this;
                      }
                      var dur = duration_1.Duration.fromDurationLike(duration).negate();
                      return this._clone(this._adjustTime(dur));
                    };
                    DateTime3.prototype.plus = function(duration) {
                      if (!this.isValid) {
                        return this;
                      }
                      var dur = duration_1.Duration.fromDurationLike(duration);
                      return this._clone(this._adjustTime(dur));
                    };
                    DateTime3.prototype.reconfigure = function(options) {
                      var loc = this._loc.clone(options);
                      return this._clone({
                        loc
                      });
                    };
                    DateTime3.prototype.resolvedLocaleOptions = function(opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      var _a = formatter_1.Formatter.create(this._loc.clone(opts), opts).resolvedOptions(this), locale = _a.locale, numberingSystem = _a.numberingSystem, calendar = _a.calendar;
                      return {
                        locale,
                        numberingSystem,
                        outputCalendar: calendar
                      };
                    };
                    DateTime3.prototype.set = function(values) {
                      if (!this.isValid) {
                        return this;
                      }
                      var normalized = (0, util_1.normalizeObject)(values, normalizeUnit);
                      var _a = (0, conversions_1.usesLocalWeekValues)(normalized, this.loc), minDaysInFirstWeek = _a.minDaysInFirstWeek, startOfWeek = _a.startOfWeek;
                      var settingWeekStuff = (0, util_1.isDefined)(normalized.weekYear) || (0, util_1.isDefined)(normalized.weekNumber) || (0, util_1.isDefined)(normalized.weekday);
                      var containsOrdinal = (0, util_1.isDefined)(normalized.ordinal), containsGregorYear = (0, util_1.isDefined)(normalized.year), containsGregorMD = (0, util_1.isDefined)(normalized.month) || (0, util_1.isDefined)(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
                      if ((containsGregor || containsOrdinal) && definiteWeekDef) {
                        throw new errors_1.ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
                      }
                      if (containsGregorMD && containsOrdinal) {
                        throw new errors_1.ConflictingSpecificationError("Can't mix ordinal dates with month/day");
                      }
                      var mixed;
                      if (settingWeekStuff) {
                        mixed = (0, conversions_1.weekToGregorian)(tslib_1.__assign(tslib_1.__assign({}, (0, conversions_1.gregorianToWeek)(this._c, minDaysInFirstWeek, startOfWeek)), normalized), minDaysInFirstWeek, startOfWeek);
                      } else if (!(0, util_1.isUndefined)(normalized.ordinal)) {
                        mixed = (0, conversions_1.ordinalToGregorian)(tslib_1.__assign(tslib_1.__assign({}, (0, conversions_1.gregorianToOrdinal)(this._c)), normalized));
                      } else {
                        mixed = tslib_1.__assign(tslib_1.__assign({}, this.toObject()), normalized);
                        if ((0, util_1.isUndefined)(normalized.day)) {
                          mixed.day = Math.min((0, util_1.daysInMonth)(mixed.year, mixed.month), mixed.day);
                        }
                      }
                      var _b = objToTS(mixed, this._o, this.zone), ts = _b[0], o = _b[1];
                      return this._clone({
                        ts,
                        o
                      });
                    };
                    DateTime3.prototype.setLocale = function(locale) {
                      return this.reconfigure({
                        locale
                      });
                    };
                    DateTime3.prototype.setZone = function(zone, _a) {
                      var _b = _a === void 0 ? {} : _a, _d = _b.keepLocalTime, keepLocalTime = _d === void 0 ? false : _d, _e = _b.keepCalendarTime, keepCalendarTime = _e === void 0 ? false : _e;
                      zone = (0, zoneUtil_1.normalizeZone)(zone, settings_1.Settings.defaultZone);
                      if (zone.equals(this.zone)) {
                        return this;
                      } else if (!zone.isValid) {
                        return DateTime3.invalid(DateTime3._unsupportedZone(zone));
                      } else {
                        var newTS = this._ts;
                        if (keepLocalTime || keepCalendarTime) {
                          var offsetGuess = zone.offset(this._ts);
                          var asObj = this.toObject();
                          newTS = objToTS(asObj, offsetGuess, zone)[0];
                        }
                        return this._clone({
                          ts: newTS,
                          zone
                        });
                      }
                    };
                    DateTime3.prototype.startOf = function(unit, _a) {
                      var _b = _a === void 0 ? {} : _a, _d = _b.useLocaleWeeks, useLocaleWeeks = _d === void 0 ? false : _d;
                      if (!this.isValid) {
                        return this;
                      }
                      var o = {}, normalizedUnit = duration_1.Duration.normalizeUnit(unit);
                      switch (normalizedUnit) {
                        case "years":
                          o.month = 1;
                        case "quarters":
                        case "months":
                          o.day = 1;
                        case "weeks":
                        case "days":
                          o.hour = 0;
                        case "hours":
                          o.minute = 0;
                        case "minutes":
                          o.second = 0;
                        case "seconds":
                          o.millisecond = 0;
                          break;
                        case "milliseconds":
                          break;
                      }
                      if (normalizedUnit === "weeks") {
                        if (useLocaleWeeks) {
                          var startOfWeek = this.loc.getStartOfWeek();
                          var weekday = this.weekday;
                          if (weekday < startOfWeek) {
                            o.weekNumber = this.weekNumber - 1;
                          }
                          o.weekday = startOfWeek;
                        } else {
                          o.weekday = 1;
                        }
                      }
                      if (normalizedUnit === "quarters") {
                        var q = Math.ceil(this.month / 3);
                        o.month = (q - 1) * 3 + 1;
                      }
                      return this.set(o);
                    };
                    DateTime3.prototype.toBSON = function() {
                      return this.toJSDate();
                    };
                    DateTime3.prototype.toFormat = function(fmt, opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      return this.isValid ? formatter_1.Formatter.create(this._loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt) : INVALID;
                    };
                    DateTime3.prototype.toHTTP = function() {
                      return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
                    };
                    DateTime3.prototype.toISO = function(_a) {
                      var _b = _a === void 0 ? {} : _a, _d = _b.format, format = _d === void 0 ? "extended" : _d, _e = _b.suppressSeconds, suppressSeconds = _e === void 0 ? false : _e, _f = _b.suppressMilliseconds, suppressMilliseconds = _f === void 0 ? false : _f, _g = _b.includeOffset, includeOffset = _g === void 0 ? true : _g, _h = _b.extendedZone, extendedZone = _h === void 0 ? false : _h;
                      if (!this.isValid) {
                        return null;
                      }
                      var ext = format === "extended";
                      return [this._toISODate(ext), "T", this._toISOTime(ext, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone)].join("");
                    };
                    DateTime3.prototype.toISODate = function(_a) {
                      var _b = _a === void 0 ? {
                        format: "extended"
                      } : _a, _d = _b.format, format = _d === void 0 ? "extended" : _d;
                      if (!this.isValid) {
                        return null;
                      }
                      return this._toISODate(format === "extended");
                    };
                    DateTime3.prototype.toISOTime = function(_a) {
                      var _b = _a === void 0 ? {} : _a, _d = _b.suppressMilliseconds, suppressMilliseconds = _d === void 0 ? false : _d, _e = _b.suppressSeconds, suppressSeconds = _e === void 0 ? false : _e, _f = _b.includeOffset, includeOffset = _f === void 0 ? true : _f, _g = _b.includePrefix, includePrefix = _g === void 0 ? false : _g, _h = _b.extendedZone, extendedZone = _h === void 0 ? false : _h, _j = _b.format, format = _j === void 0 ? "extended" : _j;
                      if (!this.isValid) {
                        return null;
                      }
                      return [includePrefix ? "T" : "", this._toISOTime(format === "extended", suppressSeconds, suppressMilliseconds, includeOffset, extendedZone)].join("");
                    };
                    DateTime3.prototype.toISOWeekDate = function() {
                      return toTechFormat(this, "kkkk-'W'WW-c");
                    };
                    DateTime3.prototype.toJSDate = function() {
                      return new Date(this.isValid ? this._ts : NaN);
                    };
                    DateTime3.prototype.toJSON = function() {
                      return this.toISO();
                    };
                    DateTime3.prototype.toLocal = function() {
                      return this.setZone(settings_1.Settings.defaultZone);
                    };
                    DateTime3.prototype.toLocaleParts = function(opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      return this.isValid ? formatter_1.Formatter.create(this._loc.clone(opts), opts).formatDateTimeParts(this) : [];
                    };
                    DateTime3.prototype.toLocaleString = function(formatOpts, opts) {
                      if (formatOpts === void 0) {
                        formatOpts = Formats.DATE_SHORT;
                      }
                      if (opts === void 0) {
                        opts = {};
                      }
                      return this.isValid ? formatter_1.Formatter.create(this._loc.clone(opts), formatOpts).formatDateTime(this) : INVALID;
                    };
                    DateTime3.prototype.toMillis = function() {
                      return this.isValid ? this.ts : NaN;
                    };
                    DateTime3.prototype.toObject = function(opts) {
                      if (opts === void 0) {
                        opts = {
                          includeConfig: false
                        };
                      }
                      if (!this.isValid) {
                        return {};
                      }
                      var base = Object.assign({}, this._c);
                      if (opts.includeConfig) {
                        base.outputCalendar = this.outputCalendar;
                        base.numberingSystem = this._loc.numberingSystem;
                        base.locale = this._loc.locale;
                      }
                      return base;
                    };
                    DateTime3.prototype.toRFC2822 = function() {
                      return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
                    };
                    DateTime3.prototype.toRelative = function(options) {
                      if (options === void 0) {
                        options = {};
                      }
                      if (!this.isValid) {
                        return null;
                      }
                      var base = options.base || DateTime3.fromObject({}, {
                        zone: this.zone
                      });
                      var padding = options.padding ? this < base ? -options.padding : options.padding : 0;
                      var units = ["years", "months", "days", "hours", "minutes", "seconds"];
                      var unit = options.unit;
                      if (Array.isArray(options.unit)) {
                        units = options.unit;
                        unit = void 0;
                      }
                      return DateTime3._diffRelative(base, this.plus(padding), tslib_1.__assign(tslib_1.__assign({}, options), {
                        numeric: "always",
                        units,
                        unit
                      }));
                    };
                    DateTime3.prototype.toRelativeCalendar = function(options) {
                      if (options === void 0) {
                        options = {};
                      }
                      if (!this.isValid) {
                        return null;
                      }
                      return DateTime3._diffRelative(options.base || DateTime3.fromObject({}, {
                        zone: this.zone
                      }), this, tslib_1.__assign(tslib_1.__assign({}, options), {
                        numeric: "auto",
                        units: ["years", "months", "days"],
                        calendary: true
                      }));
                    };
                    DateTime3.prototype.toSQL = function(opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      if (!this.isValid) {
                        return null;
                      }
                      return "".concat(this.toSQLDate(), " ").concat(this.toSQLTime(opts));
                    };
                    DateTime3.prototype.toSQLDate = function() {
                      if (!this.isValid) {
                        return null;
                      }
                      return this._toISODate(true);
                    };
                    DateTime3.prototype.toSQLTime = function(_a) {
                      var _b = _a === void 0 ? {} : _a, _d = _b.includeOffset, includeOffset = _d === void 0 ? true : _d, _e = _b.includeZone, includeZone = _e === void 0 ? false : _e, _f = _b.includeOffsetSpace, includeOffsetSpace = _f === void 0 ? true : _f;
                      var fmt = "HH:mm:ss.SSS";
                      if (includeZone || includeOffset) {
                        includeOffsetSpace && (fmt += " ");
                        if (includeZone) {
                          fmt += "z";
                        } else if (includeOffset) {
                          fmt += "ZZ";
                        }
                      }
                      return toTechFormat(this, fmt, true);
                    };
                    DateTime3.prototype.toSeconds = function() {
                      return this.isValid ? this._ts / 1e3 : NaN;
                    };
                    DateTime3.prototype.toString = function() {
                      return this.isValid ? this.toISO() : INVALID;
                    };
                    DateTime3.prototype.toUTC = function(offset, opts) {
                      if (offset === void 0) {
                        offset = 0;
                      }
                      if (opts === void 0) {
                        opts = {};
                      }
                      return this.setZone(fixedOffsetZone_1.FixedOffsetZone.instance(offset), opts);
                    };
                    DateTime3.prototype.toUnixInteger = function() {
                      return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
                    };
                    DateTime3.prototype.until = function(other) {
                      return interval_1.Interval.fromDateTimes(this, other);
                    };
                    DateTime3.prototype.valueOf = function() {
                      return this.toMillis();
                    };
                    DateTime3.prototype._adjustTime = function(dur) {
                      var previousOffset = this._o, year = this._c.year + Math.trunc(dur.years), month = this._c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3, c = tslib_1.__assign(tslib_1.__assign({}, this._c), {
                        year,
                        month,
                        day: Math.min(this._c.day, (0, util_1.daysInMonth)(year, month)) + Math.trunc(dur.days) + Math.trunc(dur.weeks) * 7
                      }), millisToAdd = duration_1.Duration.fromObject({
                        years: dur.years - Math.trunc(dur.years),
                        quarters: dur.quarters - Math.trunc(dur.quarters),
                        months: dur.months - Math.trunc(dur.months),
                        weeks: dur.weeks - Math.trunc(dur.weeks),
                        days: dur.days - Math.trunc(dur.days),
                        hours: dur.hours,
                        minutes: dur.minutes,
                        seconds: dur.seconds,
                        milliseconds: dur.milliseconds
                      }).as("milliseconds"), localTS = (0, util_1.objToLocalTS)(c);
                      var _a = fixOffset(localTS, previousOffset, this.zone), ts = _a[0], o = _a[1];
                      if (millisToAdd !== 0) {
                        ts += millisToAdd;
                        o = this.zone.offset(ts);
                      }
                      return {
                        ts,
                        o
                      };
                    };
                    DateTime3.prototype._clone = function(alts) {
                      var current = {
                        ts: this._ts,
                        zone: this.zone,
                        c: this._c,
                        o: this._o,
                        loc: this._loc,
                        invalid: this._invalid || void 0
                      };
                      return new DateTime3(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, current), alts), {
                        old: current
                      }));
                    };
                    DateTime3.prototype._possiblyCachedLocalWeekData = function(dt) {
                      if (!dt._localWeekData) {
                        dt._localWeekData = (0, conversions_1.gregorianToWeek)(dt._c, dt.loc.getMinDaysInFirstWeek(), dt.loc.getStartOfWeek());
                      }
                      return dt._localWeekData;
                    };
                    DateTime3.prototype._possiblyCachedWeekData = function(dt) {
                      if (dt._weekData === null) {
                        dt._weekData = (0, conversions_1.gregorianToWeek)(dt._c);
                      }
                      return dt._weekData;
                    };
                    DateTime3.prototype._toISODate = function(extended) {
                      var longFormat = this._c.year > 9999 || this._c.year < 0;
                      var c = "";
                      if (longFormat && this._c.year >= 0) {
                        c += "+";
                      }
                      c += (0, util_1.padStart)(this._c.year, longFormat ? 6 : 4);
                      if (extended) {
                        c += "-";
                        c += (0, util_1.padStart)(this._c.month);
                        c += "-";
                        c += (0, util_1.padStart)(this._c.day);
                      } else {
                        c += (0, util_1.padStart)(this._c.month);
                        c += (0, util_1.padStart)(this._c.day);
                      }
                      return c;
                    };
                    DateTime3.prototype._toISOTime = function(extended, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone) {
                      var c = (0, util_1.padStart)(this._c.hour);
                      if (extended) {
                        c += ":";
                        c += (0, util_1.padStart)(this._c.minute);
                        if (this._c.millisecond !== 0 || this._c.second !== 0 || !suppressSeconds) {
                          c += ":";
                        }
                      } else {
                        c += (0, util_1.padStart)(this._c.minute);
                      }
                      if (this._c.millisecond !== 0 || this._c.second !== 0 || !suppressSeconds) {
                        c += (0, util_1.padStart)(this._c.second);
                        if (this._c.millisecond !== 0 || !suppressMilliseconds) {
                          c += ".";
                          c += (0, util_1.padStart)(this._c.millisecond, 3);
                        }
                      }
                      if (includeOffset) {
                        if (this.isOffsetFixed && this.offset === 0 && !extendedZone) {
                          c += "Z";
                        } else if (this._o < 0) {
                          c += "-";
                          c += (0, util_1.padStart)(Math.trunc(-this._o / 60));
                          c += ":";
                          c += (0, util_1.padStart)(Math.trunc(-this._o % 60));
                        } else {
                          c += "+";
                          c += (0, util_1.padStart)(Math.trunc(this._o / 60));
                          c += ":";
                          c += (0, util_1.padStart)(Math.trunc(this._o % 60));
                        }
                      }
                      if (extendedZone) {
                        c += "[" + this.zone.ianaName + "]";
                      }
                      return c;
                    };
                    DateTime3.DATETIME_FULL = Formats.DATETIME_FULL;
                    DateTime3.DATETIME_FULL_WITH_SECONDS = Formats.DATETIME_FULL_WITH_SECONDS;
                    DateTime3.DATETIME_HUGE = Formats.DATETIME_HUGE;
                    DateTime3.DATETIME_HUGE_WITH_SECONDS = Formats.DATETIME_HUGE_WITH_SECONDS;
                    DateTime3.DATETIME_MED = Formats.DATETIME_MED;
                    DateTime3.DATETIME_MED_WITH_SECONDS = Formats.DATETIME_MED_WITH_SECONDS;
                    DateTime3.DATETIME_MED_WITH_WEEKDAY = Formats.DATETIME_MED_WITH_WEEKDAY;
                    DateTime3.DATETIME_SHORT = Formats.DATETIME_SHORT;
                    DateTime3.DATETIME_SHORT_WITH_SECONDS = Formats.DATETIME_SHORT_WITH_SECONDS;
                    DateTime3.DATE_FULL = Formats.DATE_FULL;
                    DateTime3.DATE_HUGE = Formats.DATE_HUGE;
                    DateTime3.DATE_MED = Formats.DATE_MED;
                    DateTime3.DATE_MED_WITH_WEEKDAY = Formats.DATE_MED_WITH_WEEKDAY;
                    DateTime3.DATE_SHORT = Formats.DATE_SHORT;
                    DateTime3.TIME_24_SIMPLE = Formats.TIME_24_SIMPLE;
                    DateTime3.TIME_24_WITH_LONG_OFFSET = Formats.TIME_24_WITH_LONG_OFFSET;
                    DateTime3.TIME_24_WITH_SECONDS = Formats.TIME_24_WITH_SECONDS;
                    DateTime3.TIME_24_WITH_SHORT_OFFSET = Formats.TIME_24_WITH_SHORT_OFFSET;
                    DateTime3.TIME_SIMPLE = Formats.TIME_SIMPLE;
                    DateTime3.TIME_WITH_LONG_OFFSET = Formats.TIME_WITH_LONG_OFFSET;
                    DateTime3.TIME_WITH_SECONDS = Formats.TIME_WITH_SECONDS;
                    DateTime3.TIME_WITH_SHORT_OFFSET = Formats.TIME_WITH_SHORT_OFFSET;
                    DateTime3._zoneOffsetGuessCache = /* @__PURE__ */ new Map();
                    return DateTime3;
                  }()
                );
                exports2.DateTime = DateTime2;
              }
            ),
            /***/
            "./src/duration.ts": (
              /*!*************************!*\
                !*** ./src/duration.ts ***!
                \*************************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.Duration = exports2.casualMatrix = exports2.lowOrderMatrix = void 0;
                var tslib_1 = __webpack_require__2(
                  /*! tslib */
                  "./node_modules/tslib/tslib.es6.js"
                );
                var util_1 = __webpack_require__2(
                  /*! ./impl/util */
                  "./src/impl/util.ts"
                );
                var locale_1 = __webpack_require__2(
                  /*! ./impl/locale */
                  "./src/impl/locale.ts"
                );
                var formatter_1 = __webpack_require__2(
                  /*! ./impl/formatter */
                  "./src/impl/formatter.ts"
                );
                var regexParser_1 = __webpack_require__2(
                  /*! ./impl/regexParser */
                  "./src/impl/regexParser.ts"
                );
                var errors_1 = __webpack_require__2(
                  /*! ./errors */
                  "./src/errors.ts"
                );
                var settings_1 = __webpack_require__2(
                  /*! ./settings */
                  "./src/settings.ts"
                );
                var invalid_1 = __webpack_require__2(
                  /*! ./types/invalid */
                  "./src/types/invalid.ts"
                );
                var datetime_1 = __webpack_require__2(
                  /*! ./datetime */
                  "./src/datetime.ts"
                );
                exports2.lowOrderMatrix = {
                  weeks: {
                    days: 7,
                    hours: 7 * 24,
                    minutes: 7 * 24 * 60,
                    seconds: 7 * 24 * 60 * 60,
                    milliseconds: 7 * 24 * 60 * 60 * 1e3
                  },
                  days: {
                    hours: 24,
                    minutes: 24 * 60,
                    seconds: 24 * 60 * 60,
                    milliseconds: 24 * 60 * 60 * 1e3
                  },
                  hours: {
                    minutes: 60,
                    seconds: 60 * 60,
                    milliseconds: 60 * 60 * 1e3
                  },
                  minutes: {
                    seconds: 60,
                    milliseconds: 60 * 1e3
                  },
                  seconds: {
                    milliseconds: 1e3
                  }
                };
                exports2.casualMatrix = tslib_1.__assign({
                  years: {
                    quarters: 4,
                    months: 12,
                    weeks: 52,
                    days: 365,
                    hours: 365 * 24,
                    minutes: 365 * 24 * 60,
                    seconds: 365 * 24 * 60 * 60,
                    milliseconds: 365 * 24 * 60 * 60 * 1e3
                  },
                  quarters: {
                    months: 3,
                    weeks: 13,
                    days: 91,
                    hours: 91 * 24,
                    minutes: 91 * 24 * 60,
                    seconds: 91 * 24 * 60 * 60,
                    milliseconds: 91 * 24 * 60 * 60 * 1e3
                  },
                  months: {
                    weeks: 4,
                    days: 30,
                    hours: 30 * 24,
                    minutes: 30 * 24 * 60,
                    seconds: 30 * 24 * 60 * 60,
                    milliseconds: 30 * 24 * 60 * 60 * 1e3
                  }
                }, exports2.lowOrderMatrix);
                var daysInYearAccurate = 146097 / 400;
                var daysInMonthAccurate = 146097 / 4800;
                var accurateMatrix = tslib_1.__assign({
                  years: {
                    quarters: 4,
                    months: 12,
                    weeks: daysInYearAccurate / 7,
                    days: daysInYearAccurate,
                    hours: daysInYearAccurate * 24,
                    minutes: daysInYearAccurate * 24 * 60,
                    seconds: daysInYearAccurate * 24 * 60 * 60,
                    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3
                  },
                  quarters: {
                    months: 3,
                    weeks: daysInYearAccurate / 28,
                    days: daysInYearAccurate / 4,
                    hours: daysInYearAccurate * 24 / 4,
                    minutes: daysInYearAccurate * 24 * 60 / 4,
                    seconds: daysInYearAccurate * 24 * 60 * 60 / 4,
                    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3 / 4
                  },
                  months: {
                    weeks: daysInMonthAccurate / 7,
                    days: daysInMonthAccurate,
                    hours: daysInMonthAccurate * 24,
                    minutes: daysInMonthAccurate * 24 * 60,
                    seconds: daysInMonthAccurate * 24 * 60 * 60,
                    milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1e3
                  }
                }, exports2.lowOrderMatrix);
                function durationToMillis(matrix, vals) {
                  var _a;
                  var sum = (_a = vals.milliseconds) !== null && _a !== void 0 ? _a : 0;
                  for (var _i = 0, _b = util_1.REVERSE_ORDERED_UNITS.slice(1); _i < _b.length; _i++) {
                    var unit = _b[_i];
                    if (vals[unit]) {
                      sum += vals[unit] * matrix[unit]["milliseconds"];
                    }
                  }
                  return sum;
                }
                function eq(v1, v2) {
                  if (v1 === void 0 || v1 === 0) {
                    return v2 === void 0 || v2 === 0;
                  }
                  return v1 === v2;
                }
                function normalizeValues(matrix, vals) {
                  var factor = durationToMillis(matrix, vals) < 0 ? -1 : 1;
                  util_1.REVERSE_ORDERED_UNITS.reduce(function(previous, current) {
                    if (!(0, util_1.isUndefined)(vals[current])) {
                      if (previous) {
                        var previousVal = vals[previous] * factor;
                        var conv = matrix[current][previous];
                        var rollUp = Math.floor(previousVal / conv);
                        vals[current] += rollUp * factor;
                        vals[previous] -= rollUp * conv * factor;
                      }
                      return current;
                    } else {
                      return previous;
                    }
                  }, null);
                  util_1.ORDERED_UNITS.reduce(function(previous, current) {
                    if (!(0, util_1.isUndefined)(vals[current])) {
                      if (previous) {
                        var fraction = vals[previous] % 1;
                        vals[previous] -= fraction;
                        vals[current] += fraction * matrix[previous][current];
                      }
                      return current;
                    } else {
                      return previous;
                    }
                  }, null);
                }
                function removeZeroes(vals) {
                  if (vals === void 0) {
                    vals = {};
                  }
                  return Object.entries(vals).reduce(function(acc, _a) {
                    var key = _a[0], value = _a[1];
                    if (value !== 0) {
                      acc[key] = value;
                    }
                    return acc;
                  }, {});
                }
                var Duration = (
                  /** @class */
                  function() {
                    function Duration2(config2) {
                      var accurate = config2.conversionAccuracy === "longterm" || false;
                      var matrix, conversionAccuracy;
                      if (accurate) {
                        conversionAccuracy = "longterm";
                        matrix = accurateMatrix;
                      } else {
                        conversionAccuracy = "casual";
                        matrix = exports2.casualMatrix;
                      }
                      if (config2.matrix) {
                        matrix = config2.matrix;
                      }
                      this._values = config2.values || {};
                      this._loc = config2.loc || locale_1.Locale.create();
                      this._conversionAccuracy = conversionAccuracy;
                      this._invalid = config2.invalid || null;
                      this._matrix = matrix;
                      this._isLuxonDuration = true;
                    }
                    Object.defineProperty(Duration2, "_INVALID", {
                      get: function() {
                        return "Invalid Duration";
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Duration2.prototype, "conversionAccuracy", {
                      /**
                       * Returns the conversion system to use
                       * @type {ConversionAccuracy}
                       */
                      get: function() {
                        return this._conversionAccuracy;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Duration2.prototype, "days", {
                      /**
                       * Get the days.
                       * @type {number}
                       */
                      get: function() {
                        return this.isValid ? this._values.days || 0 : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Duration2.prototype, "hours", {
                      /**
                       * Get the hours.
                       * @type {number}
                       */
                      get: function() {
                        return this.isValid ? this._values.hours || 0 : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Duration2.prototype, "invalidExplanation", {
                      /**
                       * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
                       * @type {string}
                       */
                      get: function() {
                        return this._invalid ? this._invalid.explanation : null;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Duration2.prototype, "invalidReason", {
                      /**
                       * Returns an error code if this Duration became invalid, or null if the Duration is valid
                       * @return {string}
                       */
                      get: function() {
                        return this._invalid ? this._invalid.reason : null;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Duration2.prototype, "isValid", {
                      /**
                       * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
                       * on invalid DateTimes or Intervals.
                       * @return {boolean}
                       */
                      get: function() {
                        return this._invalid === null;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Duration2.prototype, "locale", {
                      /**
                       * Get  the locale of a Duration, such 'en-GB'
                       * @type {string}
                       */
                      get: function() {
                        return this.isValid ? this._loc.locale : void 0;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Duration2.prototype, "matrix", {
                      /**
                       * Get the conversion matrix of a Duration
                       * @type {ConversionMatrix}
                       */
                      get: function() {
                        return this._matrix;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Duration2.prototype, "milliseconds", {
                      /**
                       * Get the milliseconds.
                       * @return {number}
                       */
                      get: function() {
                        return this.isValid ? this._values.milliseconds || 0 : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Duration2.prototype, "minutes", {
                      /**
                       * Get the minutes.
                       * @type {number}
                       */
                      get: function() {
                        return this.isValid ? this._values.minutes || 0 : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Duration2.prototype, "months", {
                      /**
                       * Get the months.
                       * @type {number}
                       */
                      get: function() {
                        return this.isValid ? this._values.months || 0 : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Duration2.prototype, "numberingSystem", {
                      /**
                       * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
                       *
                       * @type {NumberingSystem}
                       */
                      get: function() {
                        return this.isValid ? this._loc.numberingSystem : void 0;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Duration2.prototype, "quarters", {
                      /**
                       * Get the quarters.
                       * @type {number}
                       */
                      get: function() {
                        return this.isValid ? this._values.quarters || 0 : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Duration2.prototype, "seconds", {
                      /**
                       * Get the seconds.
                       * @return {number}
                       */
                      get: function() {
                        return this.isValid ? this._values.seconds || 0 : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Duration2.prototype, "weeks", {
                      /**
                       * Get the weeks
                       * @type {number}
                       */
                      get: function() {
                        return this.isValid ? this._values.weeks || 0 : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Duration2.prototype, "years", {
                      /**
                       * Get the years.
                       * @type {number}
                       */
                      get: function() {
                        return this.isValid ? this._values.years || 0 : NaN;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Duration2.fromDurationLike = function(durationLike) {
                      if ((0, util_1.isNumber)(durationLike)) {
                        return Duration2.fromMillis(durationLike);
                      } else if (Duration2.isDuration(durationLike)) {
                        return durationLike;
                      } else if (typeof durationLike === "object") {
                        return Duration2.fromObject(durationLike);
                      } else {
                        throw new errors_1.InvalidArgumentError("Unknown duration argument ".concat(durationLike, " of type ").concat(typeof durationLike));
                      }
                    };
                    Duration2.fromISO = function(text, opts) {
                      var parsed = (0, regexParser_1.parseISODuration)(text)[0];
                      if (parsed) {
                        return Duration2.fromObject(parsed, opts);
                      } else {
                        return Duration2.invalid("unparsable", 'the input "'.concat(text, `" can't be parsed as ISO 8601`));
                      }
                    };
                    Duration2.fromISOTime = function(text, opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      var parsed = (0, regexParser_1.parseISOTimeOnly)(text)[0];
                      if (parsed) {
                        return Duration2.fromObject(parsed, opts);
                      } else {
                        return Duration2.invalid("unparsable", 'the input "'.concat(text, `" can't be parsed as ISO 8601`));
                      }
                    };
                    Duration2.fromMillis = function(milliseconds, opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      return Duration2.fromObject({
                        milliseconds
                      }, opts);
                    };
                    Duration2.fromObject = function(obj, opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      if (obj == null || typeof obj !== "object") {
                        throw new errors_1.InvalidArgumentError("Duration.fromObject: argument expected to be an object, got ".concat(obj === null ? "null" : typeof obj));
                      }
                      return new Duration2({
                        values: (0, util_1.normalizeObject)(obj, Duration2.normalizeUnit),
                        loc: locale_1.Locale.fromObject(opts),
                        conversionAccuracy: opts.conversionAccuracy,
                        matrix: opts.matrix
                      });
                    };
                    Duration2.invalid = function(reason, explanation) {
                      if (!reason) {
                        throw new errors_1.InvalidArgumentError("need to specify a reason the Duration is invalid");
                      }
                      var invalid = reason instanceof invalid_1.Invalid ? reason : new invalid_1.Invalid(reason, explanation);
                      if (settings_1.Settings.throwOnInvalid) {
                        throw new errors_1.InvalidDurationError(invalid);
                      } else {
                        return new Duration2({
                          invalid
                        });
                      }
                    };
                    Duration2.isDuration = function(o) {
                      return !!o && o._isLuxonDuration || false;
                    };
                    Duration2.normalizeUnit = function(unit) {
                      var normalized = {
                        year: "years",
                        years: "years",
                        quarter: "quarters",
                        quarters: "quarters",
                        month: "months",
                        months: "months",
                        localWeekNumber: "localWeekNumbers",
                        localWeekYear: "localWeekYears",
                        localWeekday: "localWeekdays",
                        localWeekNumbers: "localWeekNumbers",
                        localWeekYears: "localWeekYears",
                        localWeekdays: "localWeekdays",
                        week: "weeks",
                        weeks: "weeks",
                        day: "days",
                        days: "days",
                        hour: "hours",
                        hours: "hours",
                        minute: "minutes",
                        minutes: "minutes",
                        second: "seconds",
                        seconds: "seconds",
                        millisecond: "milliseconds",
                        milliseconds: "milliseconds"
                      }[unit];
                      if (!normalized) {
                        throw new errors_1.InvalidUnitError(unit);
                      }
                      return normalized;
                    };
                    Duration2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
                      if (this.isValid) {
                        return "Duration { values: ".concat(JSON.stringify(this._values), " }");
                      } else {
                        return "Duration { Invalid, reason: ".concat(this.invalidReason, " }");
                      }
                    };
                    Duration2.prototype.as = function(unit) {
                      return this.shiftTo(unit).get(unit);
                    };
                    Duration2.prototype.equals = function(other) {
                      if (!this.isValid || !other.isValid) {
                        return false;
                      }
                      if (!this._loc.equals(other._loc)) {
                        return false;
                      }
                      for (var _i = 0, ORDERED_UNITS_1 = util_1.ORDERED_UNITS; _i < ORDERED_UNITS_1.length; _i++) {
                        var u = ORDERED_UNITS_1[_i];
                        if (!eq(this._values[u], other._values[u])) {
                          return false;
                        }
                      }
                      return true;
                    };
                    Duration2.prototype.get = function(unit) {
                      return this[Duration2.normalizeUnit(unit)];
                    };
                    Duration2.prototype.getMaxUnit = function(onlyHuman) {
                      if (onlyHuman === void 0) {
                        onlyHuman = false;
                      }
                      var refUnits = onlyHuman ? util_1.HUMAN_ORDERED_UNITS : util_1.ORDERED_UNITS;
                      var val = this.shiftTo.apply(this, refUnits).toObject();
                      return refUnits.find(function(k) {
                        return (val[k] || 0) > 0;
                      }) || util_1.REVERSE_ORDERED_UNITS[0];
                    };
                    Duration2.prototype.mapUnits = function(fn) {
                      var _this = this;
                      if (!this.isValid) {
                        return this;
                      }
                      var result = {};
                      Object.keys(this._values).forEach(function(unit) {
                        result[unit] = (0, util_1.asNumber)(fn(_this._values[unit], unit));
                      });
                      return this._clone(this, {
                        values: result
                      }, true);
                    };
                    Duration2.prototype.minus = function(duration) {
                      if (!this.isValid) {
                        return this;
                      }
                      var dur = Duration2.fromDurationLike(duration);
                      return this.plus(dur.negate());
                    };
                    Duration2.prototype.negate = function() {
                      var _this = this;
                      if (!this.isValid) {
                        return this;
                      }
                      var negated = {};
                      Object.keys(this._values).forEach(function(unit) {
                        negated[unit] = _this._values[unit] === 0 ? 0 : -_this._values[unit];
                      });
                      return this._clone(this, {
                        values: negated
                      }, true);
                    };
                    Duration2.prototype.normalize = function() {
                      if (!this.isValid) {
                        return this;
                      }
                      var vals = this.toObject();
                      normalizeValues(this._matrix, vals);
                      return this._clone(this, {
                        values: vals
                      }, true);
                    };
                    Duration2.prototype.plus = function(duration) {
                      var _this = this;
                      if (!this.isValid) {
                        return this;
                      }
                      var dur = Duration2.fromDurationLike(duration), result = {};
                      util_1.ORDERED_UNITS.forEach(function(unit) {
                        if (dur._values[unit] !== void 0 || _this._values[unit] !== void 0) {
                          result[unit] = dur.get(unit) + _this.get(unit);
                        }
                      });
                      return this._clone(this, {
                        values: result
                      }, true);
                    };
                    Duration2.prototype.reconfigure = function(_a) {
                      var _b = _a === void 0 ? {} : _a, locale = _b.locale, numberingSystem = _b.numberingSystem, conversionAccuracy = _b.conversionAccuracy, matrix = _b.matrix;
                      var loc = this._loc.clone({
                        locale,
                        numberingSystem
                      });
                      var opts = {
                        loc,
                        matrix,
                        conversionAccuracy
                      };
                      return this._clone(this, opts);
                    };
                    Duration2.prototype.rescale = function() {
                      if (!this.isValid) {
                        return this;
                      }
                      var vals = removeZeroes(this.normalize().shiftToAll().toObject());
                      return this._clone(this, {
                        values: vals
                      }, true);
                    };
                    Duration2.prototype.set = function(values) {
                      if (!this.isValid) {
                        return this;
                      }
                      var mixed = tslib_1.__assign(tslib_1.__assign({}, this._values), (0, util_1.normalizeObject)(values, Duration2.normalizeUnit));
                      return this._clone(this, {
                        values: mixed
                      });
                    };
                    Duration2.prototype.shiftTo = function() {
                      var _this = this;
                      var units = [];
                      for (var _i = 0; _i < arguments.length; _i++) {
                        units[_i] = arguments[_i];
                      }
                      if (!this.isValid || units.length === 0) {
                        return this;
                      }
                      units = units.map(function(u) {
                        return Duration2.normalizeUnit(u);
                      });
                      var built = {}, accumulated = {}, vals = this.toObject();
                      var lastUnit;
                      util_1.ORDERED_UNITS.forEach(function(k) {
                        if (units.indexOf(k) >= 0) {
                          lastUnit = k;
                          var own_1 = 0;
                          Object.keys(accumulated).forEach(function(ak) {
                            own_1 += _this._matrix[ak][k] * accumulated[ak];
                            accumulated[ak] = 0;
                          });
                          if ((0, util_1.isNumber)(vals[k])) {
                            own_1 += vals[k];
                          }
                          var i = Math.trunc(own_1);
                          built[k] = i;
                          accumulated[k] = (own_1 * 1e3 - i * 1e3) / 1e3;
                        } else if ((0, util_1.isNumber)(vals[k])) {
                          accumulated[k] = vals[k];
                        }
                      });
                      Object.keys(accumulated).forEach(function(key) {
                        var v = accumulated[key];
                        if (v !== 0) {
                          built[lastUnit] += key === lastUnit ? v : v / _this._matrix[lastUnit][key];
                        }
                      });
                      return this._clone(this, {
                        values: built
                      }, true).normalize();
                    };
                    Duration2.prototype.shiftToAll = function() {
                      if (!this.isValid) {
                        return this;
                      }
                      return this.shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds");
                    };
                    Duration2.prototype.toFormat = function(fmt, opts) {
                      if (opts === void 0) {
                        opts = {
                          floor: true
                        };
                      }
                      var fmtOpts = tslib_1.__assign(tslib_1.__assign({}, opts), {
                        floor: opts.round !== false && opts.floor !== false
                      });
                      return this.isValid ? formatter_1.Formatter.create(this._loc, fmtOpts).formatDurationFromString(this, fmt) : Duration2._INVALID;
                    };
                    Duration2.prototype.toHuman = function(opts) {
                      var _this = this;
                      if (opts === void 0) {
                        opts = {};
                      }
                      if (!this.isValid) {
                        return Duration2._INVALID;
                      }
                      var maxUnit = this.getMaxUnit(true);
                      var refUnits = !!opts.onlyHumanUnits ? util_1.HUMAN_ORDERED_UNITS : util_1.ORDERED_UNITS;
                      var shifted = this.shiftTo.apply(this, refUnits.slice(refUnits.indexOf(maxUnit)));
                      var shiftedValues = shifted.toObject();
                      var l = refUnits.map(function(unit) {
                        var val = shiftedValues[unit];
                        if ((0, util_1.isUndefined)(val) || val === 0) {
                          return null;
                        }
                        return _this._loc.numberFormatter(tslib_1.__assign(tslib_1.__assign({
                          style: "unit",
                          unitDisplay: "long"
                        }, opts), {
                          unit: unit.slice(0, -1)
                        })).format(val);
                      }).filter(function(n) {
                        return n;
                      });
                      var mergedOpts = tslib_1.__assign({
                        type: "conjunction",
                        style: opts.listStyle || "narrow"
                      }, opts);
                      return this._loc.listFormatter(mergedOpts).format(l);
                    };
                    Duration2.prototype.toISO = function() {
                      if (!this.isValid) {
                        return null;
                      }
                      var s = "P";
                      if (this.years !== 0) {
                        s += this.years + "Y";
                      }
                      if (this.months !== 0 || this.quarters !== 0) {
                        s += this.months + this.quarters * 3 + "M";
                      }
                      if (this.weeks !== 0) {
                        s += this.weeks + "W";
                      }
                      if (this.days !== 0) {
                        s += this.days + "D";
                      }
                      if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) {
                        s += "T";
                      }
                      if (this.hours !== 0) {
                        s += this.hours + "H";
                      }
                      if (this.minutes !== 0) {
                        s += this.minutes + "M";
                      }
                      if (this.seconds !== 0 || this.milliseconds !== 0) {
                        s += (0, util_1.roundTo)(this.seconds + this.milliseconds / 1e3, 3) + "S";
                      }
                      if (s === "P") {
                        s += "T0S";
                      }
                      return s;
                    };
                    Duration2.prototype.toISOTime = function(opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      if (!this.isValid) {
                        return null;
                      }
                      var millis = this.toMillis();
                      if (millis < 0 || millis >= 864e5) {
                        return null;
                      }
                      opts = tslib_1.__assign(tslib_1.__assign({
                        suppressMilliseconds: false,
                        suppressSeconds: false,
                        includePrefix: false,
                        format: "extended"
                      }, opts), {
                        includeOffset: false
                      });
                      var dateTime = datetime_1.DateTime.fromMillis(millis, {
                        zone: "UTC"
                      });
                      return dateTime.toISOTime(opts);
                    };
                    Duration2.prototype.toJSON = function() {
                      return this.toISO();
                    };
                    Duration2.prototype.toMillis = function() {
                      if (!this.isValid) {
                        return NaN;
                      }
                      return durationToMillis(this.matrix, this._values);
                    };
                    Duration2.prototype.toObject = function() {
                      if (!this.isValid) {
                        return {};
                      }
                      return tslib_1.__assign({}, this._values);
                    };
                    Duration2.prototype.toString = function() {
                      return this.toISO();
                    };
                    Duration2.prototype.valueOf = function() {
                      return this.toMillis();
                    };
                    Duration2.prototype._clone = function(dur, alts, clear) {
                      if (clear === void 0) {
                        clear = false;
                      }
                      var conf = {
                        values: clear ? alts.values : tslib_1.__assign(tslib_1.__assign({}, dur._values), alts.values || {}),
                        loc: dur._loc.clone(alts.loc),
                        conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy,
                        matrix: alts.matrix || dur.matrix
                      };
                      return new Duration2(conf);
                    };
                    return Duration2;
                  }()
                );
                exports2.Duration = Duration;
              }
            ),
            /***/
            "./src/errors.ts": (
              /*!***********************!*\
                !*** ./src/errors.ts ***!
                \***********************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.ZoneIsAbstractError = exports2.InvalidArgumentError = exports2.ConflictingSpecificationError = exports2.InvalidZoneError = exports2.InvalidUnitError = exports2.InvalidIntervalError = exports2.InvalidDurationError = exports2.InvalidDateTimeError = void 0;
                var tslib_1 = __webpack_require__2(
                  /*! tslib */
                  "./node_modules/tslib/tslib.es6.js"
                );
                var TsLuxonError = (
                  /** @class */
                  function(_super) {
                    tslib_1.__extends(TsLuxonError2, _super);
                    function TsLuxonError2() {
                      return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return TsLuxonError2;
                  }(Error)
                );
                var InvalidDateTimeError = (
                  /** @class */
                  function(_super) {
                    tslib_1.__extends(InvalidDateTimeError2, _super);
                    function InvalidDateTimeError2(reason) {
                      return _super.call(this, "Invalid DateTime: ".concat(reason.toMessage())) || this;
                    }
                    return InvalidDateTimeError2;
                  }(TsLuxonError)
                );
                exports2.InvalidDateTimeError = InvalidDateTimeError;
                var InvalidDurationError = (
                  /** @class */
                  function(_super) {
                    tslib_1.__extends(InvalidDurationError2, _super);
                    function InvalidDurationError2(reason) {
                      return _super.call(this, "Invalid Duration: ".concat(reason.toMessage())) || this;
                    }
                    return InvalidDurationError2;
                  }(TsLuxonError)
                );
                exports2.InvalidDurationError = InvalidDurationError;
                var InvalidIntervalError = (
                  /** @class */
                  function(_super) {
                    tslib_1.__extends(InvalidIntervalError2, _super);
                    function InvalidIntervalError2(reason) {
                      return _super.call(this, "Invalid Interval: ".concat(reason.toMessage())) || this;
                    }
                    return InvalidIntervalError2;
                  }(TsLuxonError)
                );
                exports2.InvalidIntervalError = InvalidIntervalError;
                var InvalidUnitError = (
                  /** @class */
                  function(_super) {
                    tslib_1.__extends(InvalidUnitError2, _super);
                    function InvalidUnitError2(unit) {
                      var _this = _super.call(this, "Invalid unit ".concat(unit)) || this;
                      Object.setPrototypeOf(_this, InvalidUnitError2.prototype);
                      return _this;
                    }
                    return InvalidUnitError2;
                  }(TsLuxonError)
                );
                exports2.InvalidUnitError = InvalidUnitError;
                var InvalidZoneError = (
                  /** @class */
                  function(_super) {
                    tslib_1.__extends(InvalidZoneError2, _super);
                    function InvalidZoneError2(zoneName) {
                      var _this = _super.call(this, "".concat(zoneName, " is an invalid or unknown zone specifier")) || this;
                      Object.setPrototypeOf(_this, InvalidZoneError2.prototype);
                      return _this;
                    }
                    return InvalidZoneError2;
                  }(TsLuxonError)
                );
                exports2.InvalidZoneError = InvalidZoneError;
                var ConflictingSpecificationError = (
                  /** @class */
                  function(_super) {
                    tslib_1.__extends(ConflictingSpecificationError2, _super);
                    function ConflictingSpecificationError2(message) {
                      var _this = _super.call(this, message) || this;
                      Object.setPrototypeOf(_this, ConflictingSpecificationError2.prototype);
                      return _this;
                    }
                    return ConflictingSpecificationError2;
                  }(TsLuxonError)
                );
                exports2.ConflictingSpecificationError = ConflictingSpecificationError;
                var InvalidArgumentError = (
                  /** @class */
                  function(_super) {
                    tslib_1.__extends(InvalidArgumentError2, _super);
                    function InvalidArgumentError2(message) {
                      var _this = _super.call(this, message) || this;
                      Object.setPrototypeOf(_this, InvalidArgumentError2.prototype);
                      return _this;
                    }
                    return InvalidArgumentError2;
                  }(TsLuxonError)
                );
                exports2.InvalidArgumentError = InvalidArgumentError;
                var ZoneIsAbstractError = (
                  /** @class */
                  function(_super) {
                    tslib_1.__extends(ZoneIsAbstractError2, _super);
                    function ZoneIsAbstractError2() {
                      var _this = _super.call(this, "Zone is an abstract class") || this;
                      Object.setPrototypeOf(_this, ZoneIsAbstractError2.prototype);
                      return _this;
                    }
                    return ZoneIsAbstractError2;
                  }(TsLuxonError)
                );
                exports2.ZoneIsAbstractError = ZoneIsAbstractError;
              }
            ),
            /***/
            "./src/impl/conversions.ts": (
              /*!*********************************!*\
                !*** ./src/impl/conversions.ts ***!
                \*********************************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.usesLocalWeekValues = exports2.isoWeekdayToLocal = exports2.hasInvalidTimeData = exports2.hasInvalidGregorianData = exports2.hasInvalidOrdinalData = exports2.hasInvalidWeekData = exports2.ordinalToGregorian = exports2.gregorianToOrdinal = exports2.weekToGregorian = exports2.gregorianToWeek = exports2.dayOfWeek = void 0;
                var tslib_1 = __webpack_require__2(
                  /*! tslib */
                  "./node_modules/tslib/tslib.es6.js"
                );
                var util_1 = __webpack_require__2(
                  /*! ./util */
                  "./src/impl/util.ts"
                );
                var invalid_1 = __webpack_require__2(
                  /*! ../types/invalid */
                  "./src/types/invalid.ts"
                );
                var errors_1 = __webpack_require__2(
                  /*! ../errors */
                  "./src/errors.ts"
                );
                var nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
                var leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
                function unitOutOfRange(unit, value) {
                  return new invalid_1.Invalid("unit out of range", "you specified ".concat(value, " (of type ").concat(typeof value, ") as a ").concat(unit, ", which is invalid"));
                }
                function computeOrdinal(year, month, day) {
                  return day + ((0, util_1.isLeapYear)(year) ? leapLadder : nonLeapLadder)[month - 1];
                }
                function uncomputeOrdinal(year, ordinal) {
                  var table = (0, util_1.isLeapYear)(year) ? leapLadder : nonLeapLadder;
                  var month0 = table.findIndex(function(i) {
                    return i < ordinal;
                  });
                  var day = ordinal - table[month0];
                  return {
                    month: month0 + 1,
                    day
                  };
                }
                function dayOfWeek(year, month, day) {
                  var d = new Date(Date.UTC(year, month - 1, day));
                  if (year < 100 && year >= 0) {
                    d.setUTCFullYear(d.getUTCFullYear() - 1900);
                  }
                  var js = d.getUTCDay();
                  return js === 0 ? 7 : js;
                }
                exports2.dayOfWeek = dayOfWeek;
                function gregorianToWeek(gregObj, minDaysInFirstWeek, startOfWeek) {
                  if (minDaysInFirstWeek === void 0) {
                    minDaysInFirstWeek = util_1.FALLBACK_WEEK_SETTINGS.minimalDays;
                  }
                  if (startOfWeek === void 0) {
                    startOfWeek = util_1.FALLBACK_WEEK_SETTINGS.firstDay;
                  }
                  var year = gregObj.year, month = gregObj.month, day = gregObj.day;
                  var ordinal = computeOrdinal(year, month, day);
                  var weekday = isoWeekdayToLocal(dayOfWeek(year, month, day), startOfWeek);
                  var weekNumber = Math.floor((ordinal - weekday + 14 - minDaysInFirstWeek) / 7), weekYear;
                  if (weekNumber < 1) {
                    weekYear = year - 1;
                    weekNumber = (0, util_1.weeksInWeekYear)(weekYear, minDaysInFirstWeek, startOfWeek);
                  } else if (weekNumber > (0, util_1.weeksInWeekYear)(year, minDaysInFirstWeek, startOfWeek)) {
                    weekYear = year + 1;
                    weekNumber = 1;
                  } else {
                    weekYear = year;
                  }
                  return tslib_1.__assign({
                    weekYear,
                    weekNumber,
                    weekday
                  }, (0, util_1.timeObject)(gregObj));
                }
                exports2.gregorianToWeek = gregorianToWeek;
                function weekToGregorian(weekData, minDaysInFirstWeek, startOfWeek) {
                  if (minDaysInFirstWeek === void 0) {
                    minDaysInFirstWeek = util_1.FALLBACK_WEEK_SETTINGS.minimalDays;
                  }
                  if (startOfWeek === void 0) {
                    startOfWeek = util_1.FALLBACK_WEEK_SETTINGS.firstDay;
                  }
                  var weekYear = weekData.weekYear, weekNumber = weekData.weekNumber, weekday = weekData.weekday;
                  var weekdayOfJan4 = isoWeekdayToLocal(dayOfWeek(weekYear, 1, minDaysInFirstWeek), startOfWeek);
                  var yearInDays = (0, util_1.daysInYear)(weekYear);
                  var ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 7 + minDaysInFirstWeek, year;
                  if (ordinal < 1) {
                    year = weekYear - 1;
                    ordinal += (0, util_1.daysInYear)(year);
                  } else if (ordinal > yearInDays) {
                    year = weekYear + 1;
                    ordinal -= (0, util_1.daysInYear)(weekYear);
                  } else {
                    year = weekYear;
                  }
                  var _a = uncomputeOrdinal(year, ordinal), month = _a.month, day = _a.day;
                  return tslib_1.__assign({
                    year,
                    month,
                    day
                  }, (0, util_1.timeObject)(weekData));
                }
                exports2.weekToGregorian = weekToGregorian;
                function gregorianToOrdinal(gregData) {
                  var year = gregData.year, month = gregData.month, day = gregData.day;
                  var ordinal = computeOrdinal(year, month, day);
                  return tslib_1.__assign({
                    year,
                    ordinal
                  }, (0, util_1.timeObject)(gregData));
                }
                exports2.gregorianToOrdinal = gregorianToOrdinal;
                function ordinalToGregorian(ordinalData) {
                  var year = ordinalData.year, ordinal = ordinalData.ordinal;
                  var _a = uncomputeOrdinal(year, ordinal), month = _a.month, day = _a.day;
                  return tslib_1.__assign({
                    year,
                    month,
                    day
                  }, (0, util_1.timeObject)(ordinalData));
                }
                exports2.ordinalToGregorian = ordinalToGregorian;
                function hasInvalidWeekData(obj, minDaysInFirstWeek, startOfWeek) {
                  if (minDaysInFirstWeek === void 0) {
                    minDaysInFirstWeek = 4;
                  }
                  if (startOfWeek === void 0) {
                    startOfWeek = 1;
                  }
                  var validYear = (0, util_1.isInteger)(obj.weekYear), validWeek = (0, util_1.integerBetween)(obj.weekNumber, 1, (0, util_1.weeksInWeekYear)(obj.weekYear, minDaysInFirstWeek, startOfWeek)), validWeekday = (0, util_1.integerBetween)(obj.weekday, 1, 7);
                  if (!validYear) {
                    return unitOutOfRange("weekYear", obj.weekYear);
                  } else if (!validWeek) {
                    return unitOutOfRange("week", obj.weekNumber);
                  } else if (!validWeekday) {
                    return unitOutOfRange("weekday", obj.weekday);
                  }
                  return false;
                }
                exports2.hasInvalidWeekData = hasInvalidWeekData;
                function hasInvalidOrdinalData(obj) {
                  var validYear = (0, util_1.isInteger)(obj.year), validOrdinal = (0, util_1.integerBetween)(obj.ordinal, 1, (0, util_1.daysInYear)(obj.year));
                  if (!validYear) {
                    return unitOutOfRange("year", obj.year);
                  } else if (!validOrdinal) {
                    return unitOutOfRange("ordinal", obj.ordinal);
                  }
                  return false;
                }
                exports2.hasInvalidOrdinalData = hasInvalidOrdinalData;
                function hasInvalidGregorianData(obj) {
                  var validYear = (0, util_1.isInteger)(obj.year), validMonth = (0, util_1.integerBetween)(obj.month, 1, 12), validDay = (0, util_1.integerBetween)(obj.day, 1, (0, util_1.daysInMonth)(obj.year, obj.month));
                  if (!validYear) {
                    return unitOutOfRange("year", obj.year);
                  } else if (!validMonth) {
                    return unitOutOfRange("month", obj.month);
                  } else if (!validDay) {
                    return unitOutOfRange("day", obj.day);
                  }
                  return false;
                }
                exports2.hasInvalidGregorianData = hasInvalidGregorianData;
                function hasInvalidTimeData(obj) {
                  var hour = obj.hour, minute = obj.minute, second = obj.second, millisecond = obj.millisecond;
                  var validHour = (0, util_1.integerBetween)(hour, 0, 23) || hour === 24 && minute === 0 && second === 0 && millisecond === 0, validMinute = (0, util_1.integerBetween)(minute, 0, 59), validSecond = (0, util_1.integerBetween)(second, 0, 59), validMillisecond = (0, util_1.integerBetween)(millisecond, 0, 999);
                  if (!validHour) {
                    return unitOutOfRange("hour", hour);
                  } else if (!validMinute) {
                    return unitOutOfRange("minute", minute);
                  } else if (!validSecond) {
                    return unitOutOfRange("second", second);
                  } else if (!validMillisecond) {
                    return unitOutOfRange("millisecond", millisecond);
                  }
                  return false;
                }
                exports2.hasInvalidTimeData = hasInvalidTimeData;
                function isoWeekdayToLocal(isoWeekday, startOfWeek) {
                  return (isoWeekday - startOfWeek + 7) % 7 + 1;
                }
                exports2.isoWeekdayToLocal = isoWeekdayToLocal;
                function usesLocalWeekValues(obj, loc) {
                  var hasLocaleWeekData = (0, util_1.isDefined)(obj.localWeekday) || (0, util_1.isDefined)(obj.localWeekNumber) || (0, util_1.isDefined)(obj.localWeekYear);
                  if (hasLocaleWeekData) {
                    var hasIsoWeekData = (0, util_1.isDefined)(obj.weekday) || (0, util_1.isDefined)(obj.weekNumber) || (0, util_1.isDefined)(obj.weekYear);
                    if (hasIsoWeekData) {
                      throw new errors_1.ConflictingSpecificationError("Cannot mix locale-based week fields with ISO-based week fields");
                    }
                    if ((0, util_1.isDefined)(obj.localWeekday)) {
                      obj.weekday = obj.localWeekday;
                    }
                    if ((0, util_1.isDefined)(obj.localWeekNumber)) {
                      obj.weekNumber = obj.localWeekNumber;
                    }
                    if ((0, util_1.isDefined)(obj.localWeekYear)) {
                      obj.weekYear = obj.localWeekYear;
                    }
                    delete obj.localWeekday;
                    delete obj.localWeekNumber;
                    delete obj.localWeekYear;
                    return {
                      minDaysInFirstWeek: loc.getMinDaysInFirstWeek(),
                      startOfWeek: loc.getStartOfWeek()
                    };
                  } else {
                    return {
                      minDaysInFirstWeek: util_1.FALLBACK_WEEK_SETTINGS.minimalDays,
                      startOfWeek: util_1.FALLBACK_WEEK_SETTINGS.firstDay
                    };
                  }
                }
                exports2.usesLocalWeekValues = usesLocalWeekValues;
              }
            ),
            /***/
            "./src/impl/diff.ts": (
              /*!**************************!*\
                !*** ./src/impl/diff.ts ***!
                \**************************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.diff = void 0;
                var duration_1 = __webpack_require__2(
                  /*! ../duration */
                  "./src/duration.ts"
                );
                function dayDiff(earlier, later) {
                  var utcDayStart = function(dt) {
                    return dt.toUTC(0, {
                      keepLocalTime: true
                    }).startOf("days").valueOf();
                  }, ms = utcDayStart(later) - utcDayStart(earlier);
                  return Math.floor(duration_1.Duration.fromMillis(ms).as("days"));
                }
                function highOrderDiffs(cursor, later, units) {
                  var differs = [["years", function(a, b) {
                    return b.year - a.year;
                  }], ["quarters", function(a, b) {
                    return b.quarter - a.quarter + (b.year - a.year) * 4;
                  }], ["months", function(a, b) {
                    return b.month - a.month + (b.year - a.year) * 12;
                  }], ["weeks", function(a, b) {
                    var days = dayDiff(a, b);
                    return (days - days % 7) / 7;
                  }], ["days", dayDiff]];
                  var results = {};
                  var earlier = cursor;
                  var lowestOrder, highWater;
                  for (var _i = 0, differs_1 = differs; _i < differs_1.length; _i++) {
                    var _a = differs_1[_i], unit = _a[0], differ = _a[1];
                    if (units.indexOf(unit) >= 0) {
                      lowestOrder = unit;
                      results[unit] = differ(cursor, later);
                      highWater = earlier.plus(results);
                      if (highWater > later) {
                        results[unit]--;
                        cursor = earlier.plus(results);
                        if (cursor > later) {
                          highWater = cursor;
                          results[unit]--;
                          cursor = earlier.plus(results);
                        }
                      } else {
                        cursor = highWater;
                      }
                    }
                  }
                  return [cursor, results, highWater, lowestOrder];
                }
                var diff = function(earlier, later, units, opts) {
                  var _a, _b;
                  var _c = highOrderDiffs(earlier, later, units), cursor = _c[0], results = _c[1], highWater = _c[2], lowestOrder = _c[3];
                  var remainingMillis = +later - +cursor;
                  var lowerOrderUnits = units.filter(function(u) {
                    return ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0;
                  });
                  if (lowerOrderUnits.length === 0) {
                    if (highWater < later) {
                      highWater = cursor.plus((_a = {}, _a[lowestOrder] = 1, _a));
                    }
                    if (highWater !== cursor) {
                      results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (+highWater - +cursor);
                    }
                  }
                  var duration = duration_1.Duration.fromObject(results, opts);
                  if (lowerOrderUnits.length > 0) {
                    return (_b = duration_1.Duration.fromMillis(remainingMillis, opts)).shiftTo.apply(_b, lowerOrderUnits).plus(duration);
                  } else {
                    return duration;
                  }
                };
                exports2.diff = diff;
              }
            ),
            /***/
            "./src/impl/digits.ts": (
              /*!****************************!*\
                !*** ./src/impl/digits.ts ***!
                \****************************/
              /***/
              (__unused_webpack_module, exports2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.digitRegex = exports2.resetDigitRegexCache = exports2.parseDigits = void 0;
                var numberingSystems = {
                  arab: "[٠-٩]",
                  arabext: "[۰-۹]",
                  bali: "[᭐-᭙]",
                  beng: "[০-৯]",
                  deva: "[०-९]",
                  fullwide: "[０-９]",
                  gujr: "[૦-૯]",
                  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
                  khmr: "[០-៩]",
                  knda: "[೦-೯]",
                  laoo: "[໐-໙]",
                  limb: "[᥆-᥏]",
                  mlym: "[൦-൯]",
                  mong: "[᠐-᠙]",
                  mymr: "[၀-၉]",
                  orya: "[୦-୯]",
                  tamldec: "[௦-௯]",
                  telu: "[౦-౯]",
                  thai: "[๐-๙]",
                  tibt: "[༠-༩]",
                  latn: "\\d"
                };
                var numberingSystemsUTF16 = {
                  arab: [1632, 1641],
                  arabext: [1776, 1785],
                  bali: [6992, 7001],
                  beng: [2534, 2543],
                  deva: [2406, 2415],
                  fullwide: [65296, 65303],
                  gujr: [2790, 2799],
                  khmr: [6112, 6121],
                  knda: [3302, 3311],
                  laoo: [3792, 3801],
                  limb: [6470, 6479],
                  mlym: [3430, 3439],
                  mong: [6160, 6169],
                  mymr: [4160, 4169],
                  orya: [2918, 2927],
                  tamldec: [3046, 3055],
                  telu: [3174, 3183],
                  thai: [3664, 3673],
                  tibt: [3872, 3881]
                };
                var hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");
                function parseDigits(str) {
                  var intValue = parseInt(str, 10);
                  if (!isNaN(intValue)) {
                    return intValue;
                  }
                  var digits = "";
                  for (var i = 0; i < str.length; i++) {
                    var code = str.charCodeAt(i);
                    if (str[i].search(numberingSystems.hanidec) !== -1) {
                      digits += hanidecChars.indexOf(str[i]);
                    } else {
                      for (var key in numberingSystemsUTF16) {
                        var _a = numberingSystemsUTF16[key], min = _a[0], max = _a[1];
                        if (code >= min && code <= max) {
                          digits += code - min;
                          break;
                        }
                      }
                    }
                  }
                  return parseInt(digits, 10);
                }
                exports2.parseDigits = parseDigits;
                var digitRegexCache = {};
                function resetDigitRegexCache() {
                  digitRegexCache = {};
                }
                exports2.resetDigitRegexCache = resetDigitRegexCache;
                function digitRegex(_a, append) {
                  var numberingSystem = _a.numberingSystem;
                  if (append === void 0) {
                    append = "";
                  }
                  var ns = numberingSystem || "latn";
                  if (!digitRegexCache[ns]) {
                    digitRegexCache[ns] = {};
                  }
                  if (!digitRegexCache[ns][append]) {
                    digitRegexCache[ns][append] = new RegExp("".concat(numberingSystems[ns]).concat(append));
                  }
                  return digitRegexCache[ns][append];
                }
                exports2.digitRegex = digitRegex;
              }
            ),
            /***/
            "./src/impl/english.ts": (
              /*!*****************************!*\
                !*** ./src/impl/english.ts ***!
                \*****************************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.formatString = exports2.formatRelativeTime = exports2.eraForDateTime = exports2.monthForDateTime = exports2.weekdayForDateTime = exports2.meridiemForDateTime = exports2.eras = exports2.erasNarrow = exports2.erasShort = exports2.erasLong = exports2.meridiems = exports2.weekdays = exports2.weekdaysNarrow = exports2.weekdaysShort = exports2.weekdaysLong = exports2.months = exports2.monthsNarrow = exports2.monthsShort = exports2.monthsLong = void 0;
                var tslib_1 = __webpack_require__2(
                  /*! tslib */
                  "./node_modules/tslib/tslib.es6.js"
                );
                var Formats = tslib_1.__importStar(__webpack_require__2(
                  /*! ./formats */
                  "./src/impl/formats.ts"
                ));
                var util_1 = __webpack_require__2(
                  /*! ./util */
                  "./src/impl/util.ts"
                );
                var duration_1 = __webpack_require__2(
                  /*! ../duration */
                  "./src/duration.ts"
                );
                function stringify(obj) {
                  return JSON.stringify(obj, Object.keys(obj).sort());
                }
                exports2.monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                exports2.monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                exports2.monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
                function months(length) {
                  switch (length) {
                    case "narrow":
                      return tslib_1.__spreadArray([], exports2.monthsNarrow, true);
                    case "short":
                      return tslib_1.__spreadArray([], exports2.monthsShort, true);
                    case "long":
                      return tslib_1.__spreadArray([], exports2.monthsLong, true);
                    case "numeric":
                      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
                    case "2-digit":
                      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
                  }
                }
                exports2.months = months;
                exports2.weekdaysLong = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                exports2.weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                exports2.weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];
                function weekdays(length) {
                  switch (length) {
                    case "narrow":
                      return tslib_1.__spreadArray([], exports2.weekdaysNarrow, true);
                    case "short":
                      return tslib_1.__spreadArray([], exports2.weekdaysShort, true);
                    case "long":
                      return tslib_1.__spreadArray([], exports2.weekdaysLong, true);
                    case "numeric":
                      return ["1", "2", "3", "4", "5", "6", "7"];
                  }
                }
                exports2.weekdays = weekdays;
                exports2.meridiems = ["AM", "PM"];
                exports2.erasLong = ["Before Christ", "Anno Domini"];
                exports2.erasShort = ["BC", "AD"];
                exports2.erasNarrow = ["B", "A"];
                function eras(length) {
                  switch (length) {
                    case "narrow":
                      return tslib_1.__spreadArray([], exports2.erasNarrow, true);
                    case "short":
                      return tslib_1.__spreadArray([], exports2.erasShort, true);
                    case "long":
                      return tslib_1.__spreadArray([], exports2.erasLong, true);
                  }
                }
                exports2.eras = eras;
                function meridiemForDateTime(dt) {
                  return exports2.meridiems[dt.hour < 12 ? 0 : 1];
                }
                exports2.meridiemForDateTime = meridiemForDateTime;
                function weekdayForDateTime(dt, length) {
                  return weekdays(length)[dt.weekday - 1];
                }
                exports2.weekdayForDateTime = weekdayForDateTime;
                function monthForDateTime(dt, length) {
                  return months(length)[dt.month - 1];
                }
                exports2.monthForDateTime = monthForDateTime;
                function eraForDateTime(dt, length) {
                  return eras(length)[dt.year < 0 ? 0 : 1];
                }
                exports2.eraForDateTime = eraForDateTime;
                function formatRelativeTime(unit, count, numeric, narrow) {
                  if (numeric === void 0) {
                    numeric = "always";
                  }
                  if (narrow === void 0) {
                    narrow = false;
                  }
                  var units = {
                    years: ["year", "yr."],
                    quarters: ["quarter", "qtr."],
                    months: ["month", "mo."],
                    weeks: ["week", "wk."],
                    days: ["day", "day", "days"],
                    hours: ["hour", "hr."],
                    minutes: ["minute", "min."],
                    seconds: ["second", "sec."],
                    milliseconds: []
                    // never used
                  };
                  var normalizedUnit = duration_1.Duration.normalizeUnit(unit), unitTexts = units[normalizedUnit], lastable = ["hours", "minutes", "seconds"].indexOf(normalizedUnit) === -1;
                  if (numeric === "auto" && lastable) {
                    var isDay = normalizedUnit === "days";
                    switch (count) {
                      case 1:
                        return isDay ? "tomorrow" : "next ".concat(unitTexts[0]);
                      case -1:
                        return isDay ? "yesterday" : "last ".concat(unitTexts[0]);
                      case 0:
                        return isDay ? "today" : "this ".concat(unitTexts[0]);
                      default:
                    }
                  }
                  var isInPast = Object.is(count, -0) || count < 0, formatValue = Math.abs(count), singular = formatValue === 1, formatUnit = narrow ? singular ? unitTexts[1] : unitTexts[2] || unitTexts[1] : singular ? unitTexts[0] : normalizedUnit;
                  return isInPast ? "".concat(formatValue, " ").concat(formatUnit, " ago") : "in ".concat(formatValue, " ").concat(formatUnit);
                }
                exports2.formatRelativeTime = formatRelativeTime;
                function formatString(knownFormat) {
                  var filtered = (0, util_1.pick)(knownFormat, ["weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName", "hourCycle"]), key = stringify(filtered), dateTimeHuge = "EEEE, LLLL d, yyyy, h:mm a";
                  switch (key) {
                    case stringify(Formats.DATE_SHORT):
                      return "M/d/yyyy";
                    case stringify(Formats.DATE_MED):
                      return "LLL d, yyyy";
                    case stringify(Formats.DATE_MED_WITH_WEEKDAY):
                      return "EEE, LLL d, yyyy";
                    case stringify(Formats.DATE_FULL):
                      return "LLLL d, yyyy";
                    case stringify(Formats.DATE_HUGE):
                      return "EEEE, LLLL d, yyyy";
                    case stringify(Formats.TIME_SIMPLE):
                      return "h:mm a";
                    case stringify(Formats.TIME_WITH_SECONDS):
                      return "h:mm:ss a";
                    case stringify(Formats.TIME_WITH_SHORT_OFFSET):
                      return "h:mm a";
                    case stringify(Formats.TIME_WITH_LONG_OFFSET):
                      return "h:mm a";
                    case stringify(Formats.TIME_24_SIMPLE):
                      return "HH:mm";
                    case stringify(Formats.TIME_24_WITH_SECONDS):
                      return "HH:mm:ss";
                    case stringify(Formats.TIME_24_WITH_SHORT_OFFSET):
                      return "HH:mm";
                    case stringify(Formats.TIME_24_WITH_LONG_OFFSET):
                      return "HH:mm";
                    case stringify(Formats.DATETIME_SHORT):
                      return "M/d/yyyy, h:mm a";
                    case stringify(Formats.DATETIME_MED):
                      return "LLL d, yyyy, h:mm a";
                    case stringify(Formats.DATETIME_FULL):
                      return "LLLL d, yyyy, h:mm a";
                    case stringify(Formats.DATETIME_HUGE):
                      return dateTimeHuge;
                    case stringify(Formats.DATETIME_SHORT_WITH_SECONDS):
                      return "M/d/yyyy, h:mm:ss a";
                    case stringify(Formats.DATETIME_MED_WITH_SECONDS):
                      return "LLL d, yyyy, h:mm:ss a";
                    case stringify(Formats.DATETIME_MED_WITH_WEEKDAY):
                      return "EEE, d LLL yyyy, h:mm a";
                    case stringify(Formats.DATETIME_FULL_WITH_SECONDS):
                      return "LLLL d, yyyy, h:mm:ss a";
                    case stringify(Formats.DATETIME_HUGE_WITH_SECONDS):
                      return "EEEE, LLLL d, yyyy, h:mm:ss a";
                    default:
                      return dateTimeHuge;
                  }
                }
                exports2.formatString = formatString;
              }
            ),
            /***/
            "./src/impl/formats.ts": (
              /*!*****************************!*\
                !*** ./src/impl/formats.ts ***!
                \*****************************/
              /***/
              (__unused_webpack_module, exports2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.DATETIME_HUGE_WITH_SECONDS = exports2.DATETIME_HUGE = exports2.DATETIME_FULL_WITH_SECONDS = exports2.DATETIME_FULL = exports2.DATETIME_MED_WITH_WEEKDAY = exports2.DATETIME_MED_WITH_SECONDS = exports2.DATETIME_MED = exports2.DATETIME_SHORT_WITH_SECONDS = exports2.DATETIME_SHORT = exports2.TIME_24_WITH_LONG_OFFSET = exports2.TIME_24_WITH_SHORT_OFFSET = exports2.TIME_24_WITH_SECONDS = exports2.TIME_24_SIMPLE = exports2.TIME_WITH_LONG_OFFSET = exports2.TIME_WITH_SHORT_OFFSET = exports2.TIME_WITH_SECONDS = exports2.TIME_SIMPLE = exports2.DATE_HUGE = exports2.DATE_FULL = exports2.DATE_MED_WITH_WEEKDAY = exports2.DATE_MED = exports2.DATE_SHORT = void 0;
                var n = "numeric", s = "short", l = "long";
                exports2.DATE_SHORT = {
                  year: n,
                  month: n,
                  day: n
                };
                exports2.DATE_MED = {
                  year: n,
                  month: s,
                  day: n
                };
                exports2.DATE_MED_WITH_WEEKDAY = {
                  year: n,
                  month: s,
                  day: n,
                  weekday: s
                };
                exports2.DATE_FULL = {
                  year: n,
                  month: l,
                  day: n
                };
                exports2.DATE_HUGE = {
                  year: n,
                  month: l,
                  day: n,
                  weekday: l
                };
                exports2.TIME_SIMPLE = {
                  hour: n,
                  minute: n
                };
                exports2.TIME_WITH_SECONDS = {
                  hour: n,
                  minute: n,
                  second: n
                };
                exports2.TIME_WITH_SHORT_OFFSET = {
                  hour: n,
                  minute: n,
                  second: n,
                  timeZoneName: s
                };
                exports2.TIME_WITH_LONG_OFFSET = {
                  hour: n,
                  minute: n,
                  second: n,
                  timeZoneName: l
                };
                exports2.TIME_24_SIMPLE = {
                  hour: n,
                  minute: n,
                  hourCycle: "h23"
                };
                exports2.TIME_24_WITH_SECONDS = {
                  hour: n,
                  minute: n,
                  second: n,
                  hourCycle: "h23"
                };
                exports2.TIME_24_WITH_SHORT_OFFSET = {
                  hour: n,
                  minute: n,
                  second: n,
                  hourCycle: "h23",
                  timeZoneName: s
                };
                exports2.TIME_24_WITH_LONG_OFFSET = {
                  hour: n,
                  minute: n,
                  second: n,
                  hourCycle: "h23",
                  timeZoneName: l
                };
                exports2.DATETIME_SHORT = {
                  year: n,
                  month: n,
                  day: n,
                  hour: n,
                  minute: n
                };
                exports2.DATETIME_SHORT_WITH_SECONDS = {
                  year: n,
                  month: n,
                  day: n,
                  hour: n,
                  minute: n,
                  second: n
                };
                exports2.DATETIME_MED = {
                  year: n,
                  month: s,
                  day: n,
                  hour: n,
                  minute: n
                };
                exports2.DATETIME_MED_WITH_SECONDS = {
                  year: n,
                  month: s,
                  day: n,
                  hour: n,
                  minute: n,
                  second: n
                };
                exports2.DATETIME_MED_WITH_WEEKDAY = {
                  year: n,
                  month: s,
                  day: n,
                  weekday: s,
                  hour: n,
                  minute: n
                };
                exports2.DATETIME_FULL = {
                  year: n,
                  month: l,
                  day: n,
                  hour: n,
                  minute: n,
                  timeZoneName: s
                };
                exports2.DATETIME_FULL_WITH_SECONDS = {
                  year: n,
                  month: l,
                  day: n,
                  hour: n,
                  minute: n,
                  second: n,
                  timeZoneName: s
                };
                exports2.DATETIME_HUGE = {
                  year: n,
                  month: l,
                  day: n,
                  weekday: l,
                  hour: n,
                  minute: n,
                  timeZoneName: l
                };
                exports2.DATETIME_HUGE_WITH_SECONDS = {
                  year: n,
                  month: l,
                  day: n,
                  weekday: l,
                  hour: n,
                  minute: n,
                  second: n,
                  timeZoneName: l
                };
              }
            ),
            /***/
            "./src/impl/formatter.ts": (
              /*!*******************************!*\
                !*** ./src/impl/formatter.ts ***!
                \*******************************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.Formatter = void 0;
                var tslib_1 = __webpack_require__2(
                  /*! tslib */
                  "./node_modules/tslib/tslib.es6.js"
                );
                var English = tslib_1.__importStar(__webpack_require__2(
                  /*! ./english */
                  "./src/impl/english.ts"
                ));
                var Formats = tslib_1.__importStar(__webpack_require__2(
                  /*! ./formats */
                  "./src/impl/formats.ts"
                ));
                var util_1 = __webpack_require__2(
                  /*! ./util */
                  "./src/impl/util.ts"
                );
                function stringifyTokens(splits, tokenToString) {
                  var s = "";
                  for (var _i = 0, splits_1 = splits; _i < splits_1.length; _i++) {
                    var token = splits_1[_i];
                    if (token.literal) {
                      s += token.val;
                    } else {
                      s += tokenToString(token.val);
                    }
                  }
                  return s;
                }
                var TokenToFormatOpts = {
                  /* eslint-disable @typescript-eslint/naming-convention */
                  D: Formats.DATE_SHORT,
                  DD: Formats.DATE_MED,
                  DDD: Formats.DATE_FULL,
                  DDDD: Formats.DATE_HUGE,
                  t: Formats.TIME_SIMPLE,
                  tt: Formats.TIME_WITH_SECONDS,
                  ttt: Formats.TIME_WITH_SHORT_OFFSET,
                  tttt: Formats.TIME_WITH_LONG_OFFSET,
                  T: Formats.TIME_24_SIMPLE,
                  TT: Formats.TIME_24_WITH_SECONDS,
                  TTT: Formats.TIME_24_WITH_SHORT_OFFSET,
                  TTTT: Formats.TIME_24_WITH_LONG_OFFSET,
                  f: Formats.DATETIME_SHORT,
                  ff: Formats.DATETIME_MED,
                  fff: Formats.DATETIME_FULL,
                  ffff: Formats.DATETIME_HUGE,
                  F: Formats.DATETIME_SHORT_WITH_SECONDS,
                  FF: Formats.DATETIME_MED_WITH_SECONDS,
                  FFF: Formats.DATETIME_FULL_WITH_SECONDS,
                  FFFF: Formats.DATETIME_HUGE_WITH_SECONDS
                  /* eslint-enable @typescript-eslint/naming-convention */
                };
                var Formatter = (
                  /** @class */
                  function() {
                    function Formatter2(locale, formatOptions) {
                      this._opts = formatOptions;
                      this._loc = locale;
                      this._systemLoc = void 0;
                    }
                    Formatter2.create = function(locale, options) {
                      if (options === void 0) {
                        options = {};
                      }
                      return new Formatter2(locale, options);
                    };
                    Formatter2.macroTokenToFormatOpts = function(token) {
                      return TokenToFormatOpts[token];
                    };
                    Formatter2.parseFormat = function(fmt) {
                      var current = null, currentFull = "", bracketed = false;
                      var splits = [];
                      for (var i = 0; i < fmt.length; i++) {
                        var c = fmt.charAt(i);
                        if (c === "'") {
                          if (currentFull.length > 0) {
                            splits.push({
                              literal: bracketed || /^\s+$/.test(currentFull),
                              val: currentFull
                            });
                          }
                          current = null;
                          currentFull = "";
                          bracketed = !bracketed;
                        } else if (bracketed) {
                          currentFull += c;
                        } else if (c === current) {
                          currentFull += c;
                        } else {
                          if (currentFull.length > 0) {
                            splits.push({
                              literal: /^\s+$/.test(currentFull),
                              val: currentFull
                            });
                          }
                          currentFull = c;
                          current = c;
                        }
                      }
                      if (currentFull.length > 0) {
                        splits.push({
                          literal: bracketed || /^\s+$/.test(currentFull),
                          val: currentFull
                        });
                      }
                      return splits;
                    };
                    Formatter2.prototype.dtFormatter = function(dt, opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      return this._loc.dtFormatter(dt, tslib_1.__assign(tslib_1.__assign({}, this._opts), opts));
                    };
                    Formatter2.prototype.formatDateTime = function(dt, opts) {
                      return this.dtFormatter(dt, opts).format();
                    };
                    Formatter2.prototype.formatDateTimeFromString = function(dt, fmt) {
                      var _this = this;
                      var knownEnglish = this._loc.listingMode() === "en", useDateTimeFormatter = this._loc.outputCalendar && this._loc.outputCalendar !== "gregory", string = function(opts, extract) {
                        return _this._loc.extract(dt, opts, extract);
                      }, formatOffset = function(opts) {
                        if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
                          return "Z";
                        }
                        return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
                      }, meridiem = function() {
                        return knownEnglish ? English.meridiemForDateTime(dt) : string({
                          hour: "numeric",
                          hourCycle: "h12"
                        }, "dayPeriod");
                      }, month = function(length, standalone) {
                        return knownEnglish ? English.monthForDateTime(dt, length) : string(standalone ? {
                          month: length
                        } : {
                          month: length,
                          day: "numeric"
                        }, "month");
                      }, weekday = function(length, standalone) {
                        return knownEnglish ? English.weekdayForDateTime(dt, length) : string(standalone ? {
                          weekday: length
                        } : {
                          weekday: length,
                          month: "long",
                          day: "numeric"
                        }, "weekday");
                      }, maybeMacro = function(token) {
                        var formatOpts = Formatter2.macroTokenToFormatOpts(token);
                        if (formatOpts) {
                          return _this.formatWithSystemDefault(dt, formatOpts);
                        } else {
                          return token;
                        }
                      }, era = function(length) {
                        return knownEnglish ? English.eraForDateTime(dt, length) : string({
                          era: length
                        }, "era");
                      }, tokenToString = function(token) {
                        switch (token) {
                          case "S":
                            return _this.num(dt.millisecond);
                          case "u":
                          case "SSS":
                            return _this.num(dt.millisecond, 3);
                          case "s":
                            return _this.num(dt.second);
                          case "ss":
                            return _this.num(dt.second, 2);
                          case "uu":
                            return _this.num(Math.floor(dt.millisecond / 10), 2);
                          case "uuu":
                            return _this.num(Math.floor(dt.millisecond / 100));
                          case "m":
                            return _this.num(dt.minute);
                          case "mm":
                            return _this.num(dt.minute, 2);
                          case "h":
                            return _this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
                          case "hh":
                            return _this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
                          case "H":
                            return _this.num(dt.hour);
                          case "HH":
                            return _this.num(dt.hour, 2);
                          case "Z":
                            return formatOffset({
                              format: "narrow",
                              allowZ: _this._opts.allowZ
                            });
                          case "ZZ":
                            return formatOffset({
                              format: "short",
                              allowZ: _this._opts.allowZ
                            });
                          case "ZZZ":
                            return formatOffset({
                              format: "techie",
                              allowZ: _this._opts.allowZ
                            });
                          case "ZZZZ":
                            return dt.zone.offsetName(dt.ts, {
                              format: "short",
                              locale: _this._loc.locale
                            }) || "";
                          case "ZZZZZ":
                            return dt.zone.offsetName(dt.ts, {
                              format: "long",
                              locale: _this._loc.locale
                            }) || "";
                          case "z":
                            return dt.zoneName || "";
                          case "a":
                            return meridiem();
                          case "d":
                            return useDateTimeFormatter ? string({
                              day: "numeric"
                            }, "day") : _this.num(dt.day);
                          case "dd":
                            return useDateTimeFormatter ? string({
                              day: "2-digit"
                            }, "day") : _this.num(dt.day, 2);
                          case "c":
                            return _this.num(dt.weekday);
                          case "ccc":
                            return weekday("short", true);
                          case "cccc":
                            return weekday("long", true);
                          case "ccccc":
                            return weekday("narrow", true);
                          case "E":
                            return _this.num(dt.weekday);
                          case "EEE":
                            return weekday("short", false);
                          case "EEEE":
                            return weekday("long", false);
                          case "EEEEE":
                            return weekday("narrow", false);
                          case "L":
                            return useDateTimeFormatter ? string({
                              month: "numeric",
                              day: "numeric"
                            }, "month") : _this.num(dt.month);
                          case "LL":
                            return useDateTimeFormatter ? string({
                              month: "2-digit",
                              day: "numeric"
                            }, "month") : _this.num(dt.month, 2);
                          case "LLL":
                            return month("short", true);
                          case "LLLL":
                            return month("long", true);
                          case "LLLLL":
                            return month("narrow", true);
                          case "M":
                            return useDateTimeFormatter ? string({
                              month: "numeric"
                            }, "month") : _this.num(dt.month);
                          case "MM":
                            return useDateTimeFormatter ? string({
                              month: "2-digit"
                            }, "month") : _this.num(dt.month, 2);
                          case "MMM":
                            return month("short", false);
                          case "MMMM":
                            return month("long", false);
                          case "MMMMM":
                            return month("narrow", false);
                          case "y":
                            return useDateTimeFormatter ? string({
                              year: "numeric"
                            }, "year") : _this.num(dt.year);
                          case "yy":
                            return useDateTimeFormatter ? string({
                              year: "2-digit"
                            }, "year") : _this.num(parseInt(dt.year.toString().slice(-2), 10), 2);
                          case "yyyy":
                            return useDateTimeFormatter ? string({
                              year: "numeric"
                            }, "year") : _this.num(dt.year, 4);
                          case "yyyyyy":
                            return useDateTimeFormatter ? string({
                              year: "numeric"
                            }, "year") : _this.num(dt.year, 6);
                          case "G":
                            return era("short");
                          case "GG":
                            return era("long");
                          case "GGGGG":
                            return era("narrow");
                          case "kk":
                            return _this.num(parseInt(dt.weekYear.toString().slice(-2), 10), 2);
                          case "kkkk":
                            return _this.num(dt.weekYear, 4);
                          case "W":
                            return _this.num(dt.weekNumber);
                          case "WW":
                            return _this.num(dt.weekNumber, 2);
                          case "o":
                            return _this.num(dt.ordinal);
                          case "ooo":
                            return _this.num(dt.ordinal, 3);
                          case "q":
                            return _this.num(dt.quarter);
                          case "qq":
                            return _this.num(dt.quarter, 2);
                          case "X":
                            return _this.num(Math.floor(dt.ts / 1e3));
                          case "x":
                            return _this.num(dt.ts);
                          default:
                            return maybeMacro(token);
                        }
                      };
                      return stringifyTokens(Formatter2.parseFormat(fmt), tokenToString);
                    };
                    Formatter2.prototype.formatDateTimeParts = function(dt, opts) {
                      return this.dtFormatter(dt, opts).formatToParts();
                    };
                    Formatter2.prototype.formatDurationFromString = function(dur, format) {
                      var _this = this;
                      var tokenToField = function(token) {
                        switch (token[0]) {
                          case "S":
                            return "milliseconds";
                          case "s":
                            return "seconds";
                          case "m":
                            return "minutes";
                          case "h":
                            return "hours";
                          case "d":
                            return "days";
                          case "M":
                            return "months";
                          case "y":
                            return "years";
                          default:
                            return void 0;
                        }
                      };
                      var tokenToString = function(lildur) {
                        return function(token) {
                          var mapped = tokenToField(token);
                          if (mapped) {
                            return _this.num(lildur.get(mapped), token.length);
                          } else {
                            return token;
                          }
                        };
                      };
                      var tokens = Formatter2.parseFormat(format);
                      var realTokens = tokens.reduce(function(found, _a) {
                        var literal = _a.literal, val = _a.val;
                        return literal ? found : found.concat(val);
                      }, []);
                      var collapsed = dur.shiftTo.apply(dur, realTokens.map(tokenToField).filter(function(t) {
                        return !!t;
                      }));
                      return stringifyTokens(tokens, tokenToString(collapsed));
                    };
                    Formatter2.prototype.formatInterval = function(interval, opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      if (!interval.isValid) {
                        throw Error("Invalid Interval provided!");
                      }
                      var df = this.dtFormatter(interval.start, opts);
                      return df.dtf.formatRange(interval.start.toJSDate(), interval.end.toJSDate());
                    };
                    Formatter2.prototype.formatWithSystemDefault = function(dt, opts) {
                      if (this._systemLoc === void 0) {
                        this._systemLoc = this._loc.redefaultToSystem();
                      }
                      var df = this._systemLoc.dtFormatter(dt, tslib_1.__assign(tslib_1.__assign({}, this._opts), opts));
                      return df.format();
                    };
                    Formatter2.prototype.num = function(n, p) {
                      if (p === void 0) {
                        p = 0;
                      }
                      if (this._opts.forceSimple) {
                        return (0, util_1.padStart)(n, p);
                      }
                      var opts = tslib_1.__assign({}, this._opts);
                      if (p > 0) {
                        opts.padTo = p;
                      }
                      return this._loc.numberFormatter(opts).format(n);
                    };
                    Formatter2.prototype.resolvedOptions = function(dt, opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      return this.dtFormatter(dt, opts).resolvedOptions();
                    };
                    return Formatter2;
                  }()
                );
                exports2.Formatter = Formatter;
              }
            ),
            /***/
            "./src/impl/locale.ts": (
              /*!****************************!*\
                !*** ./src/impl/locale.ts ***!
                \****************************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.Locale = exports2.PolyDateFormatter = void 0;
                var tslib_1 = __webpack_require__2(
                  /*! tslib */
                  "./node_modules/tslib/tslib.es6.js"
                );
                var util_1 = __webpack_require__2(
                  /*! ./util */
                  "./src/impl/util.ts"
                );
                var English = tslib_1.__importStar(__webpack_require__2(
                  /*! ./english */
                  "./src/impl/english.ts"
                ));
                var settings_1 = __webpack_require__2(
                  /*! ../settings */
                  "./src/settings.ts"
                );
                var datetime_1 = __webpack_require__2(
                  /*! ../datetime */
                  "./src/datetime.ts"
                );
                var IANAZone_1 = __webpack_require__2(
                  /*! ../zones/IANAZone */
                  "./src/zones/IANAZone.ts"
                );
                var intl_next_1 = tslib_1.__importDefault(__webpack_require__2(
                  /*! ../types/intl-next */
                  "./src/types/intl-next.ts"
                ));
                var intlLFCache = {};
                function getCachedLF(locString, opts) {
                  if (opts === void 0) {
                    opts = {};
                  }
                  var key = JSON.stringify([locString, opts]);
                  var dtf = intlLFCache[key];
                  if (!dtf) {
                    dtf = new intl_next_1.default.ListFormat(locString, opts);
                    intlLFCache[key] = dtf;
                  }
                  return dtf;
                }
                var intlDTCache = {};
                function getCachedDTF(locString, options) {
                  if (options === void 0) {
                    options = {};
                  }
                  var key = JSON.stringify([locString, options]);
                  var dtf = intlDTCache[key];
                  if (!dtf) {
                    dtf = new intl_next_1.default.DateTimeFormat(locString, options);
                    intlDTCache[key] = dtf;
                  }
                  return dtf;
                }
                var intlNumCache = {};
                function getCachedINF(locString, options) {
                  var key = JSON.stringify([locString, options]);
                  var inf = intlNumCache[key];
                  if (!inf) {
                    inf = new intl_next_1.default.NumberFormat(locString, options);
                    intlNumCache[key] = inf;
                  }
                  return inf;
                }
                var intlRelCache = {};
                function getCachedRTF(locale, options) {
                  if (options === void 0) {
                    options = {};
                  }
                  var key = JSON.stringify([locale, options]);
                  var inf = intlRelCache[key];
                  if (!inf) {
                    inf = new intl_next_1.default.RelativeTimeFormat(locale, options);
                    intlRelCache[key] = inf;
                  }
                  return inf;
                }
                var sysLocaleCache;
                function systemLocale() {
                  if (!sysLocaleCache) {
                    sysLocaleCache = new intl_next_1.default.DateTimeFormat().resolvedOptions().locale;
                  }
                  return sysLocaleCache;
                }
                function parseLocaleString(localeStr) {
                  var xIndex = localeStr.indexOf("-x-");
                  if (xIndex !== -1) {
                    localeStr = localeStr.substring(0, xIndex);
                  }
                  var uIndex = localeStr.indexOf("-u-");
                  if (uIndex === -1) {
                    return [localeStr];
                  } else {
                    var options = void 0;
                    var selectedStr = void 0;
                    try {
                      options = getCachedDTF(localeStr).resolvedOptions();
                      selectedStr = localeStr;
                    } catch (e) {
                      var smaller = localeStr.substring(0, uIndex);
                      options = getCachedDTF(smaller).resolvedOptions();
                      selectedStr = smaller;
                    }
                    var numberingSystem = options.numberingSystem, calendar = options.calendar;
                    return [selectedStr, numberingSystem, calendar];
                  }
                }
                function intlConfigString(localeStr, numberingSystem, outputCalendar) {
                  if (outputCalendar || numberingSystem) {
                    if (!localeStr.includes("-u-")) {
                      localeStr += "-u";
                    }
                    if (outputCalendar) {
                      localeStr += "-ca-".concat(outputCalendar);
                    }
                    if (numberingSystem) {
                      localeStr += "-nu-".concat(numberingSystem);
                    }
                    return localeStr;
                  } else {
                    return localeStr;
                  }
                }
                function mapMonths(f) {
                  var ms = [];
                  for (var i = 1; i <= 12; i++) {
                    var dt = datetime_1.DateTime.utc(2009, i, 1);
                    ms.push(f(dt));
                  }
                  return ms;
                }
                function mapWeekdays(f) {
                  var ms = [];
                  for (var i = 1; i <= 7; i++) {
                    var dt = datetime_1.DateTime.utc(2016, 11, 13 + i);
                    ms.push(f(dt));
                  }
                  return ms;
                }
                function listStuff(loc, length, englishFn, intlFn) {
                  var mode = loc.listingMode();
                  if (mode === "en") {
                    return englishFn(length);
                  } else {
                    return intlFn(length);
                  }
                }
                var PolyNumberFormatter = (
                  /** @class */
                  function() {
                    function PolyNumberFormatter2(intl, forceSimple, opts) {
                      var padTo = opts.padTo, floor = opts.floor, otherOpts = tslib_1.__rest(opts, ["padTo", "floor"]);
                      this._padTo = padTo || 0;
                      this._floor = floor || false;
                      if (!forceSimple || Object.keys(otherOpts).length > 0) {
                        var intlOpts = tslib_1.__assign({
                          useGrouping: false
                        }, opts);
                        if (this._padTo > 0) {
                          intlOpts.minimumIntegerDigits = padTo;
                        }
                        this._inf = getCachedINF(intl, intlOpts);
                      }
                    }
                    PolyNumberFormatter2.prototype.format = function(i) {
                      if (this._inf) {
                        var fixed = this._floor ? Math.floor(i) : i;
                        return this._inf.format(fixed);
                      } else {
                        var fixed = this._floor ? Math.floor(i) : (0, util_1.roundTo)(i, 3);
                        return (0, util_1.padStart)(fixed, this._padTo);
                      }
                    };
                    return PolyNumberFormatter2;
                  }()
                );
                var PolyDateFormatter = (
                  /** @class */
                  function() {
                    function PolyDateFormatter2(dt, intl, opts) {
                      this._opts = opts;
                      var z;
                      if (this._opts.timeZone) {
                        this._dt = dt;
                      } else if (dt.zone.type === "fixed") {
                        var gmtOffset = -1 * (dt.offset / 60);
                        var offsetZ = gmtOffset >= 0 ? "Etc/GMT+".concat(gmtOffset) : "Etc/GMT".concat(gmtOffset);
                        if (dt.offset !== 0 && IANAZone_1.IANAZone.create(offsetZ).isValid) {
                          z = offsetZ;
                          this._dt = dt;
                        } else {
                          z = "UTC";
                          this._dt = dt.offset === 0 ? dt : dt.setZone("UTC").plus({
                            minutes: dt.offset
                          });
                          this._originalZone = dt.zone;
                        }
                      } else if (dt.zone.type === "system") {
                        this._dt = dt;
                      } else if (dt.zone.type === "iana") {
                        this._dt = dt;
                        z = dt.zone.name;
                      } else {
                        z = "UTC";
                        this._dt = dt.setZone("UTC").plus({
                          minutes: dt.offset
                        });
                        this._originalZone = dt.zone;
                      }
                      var intlOpts = tslib_1.__assign(tslib_1.__assign({}, this._opts), {
                        timeZone: this._opts.timeZone || z
                      });
                      this._dtf = getCachedDTF(intl, intlOpts);
                    }
                    Object.defineProperty(PolyDateFormatter2.prototype, "dtf", {
                      get: function() {
                        return this._dtf;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    PolyDateFormatter2.prototype.format = function() {
                      if (this._originalZone) {
                        return this.formatToParts().map(function(_a) {
                          var value = _a.value;
                          return value;
                        }).join("");
                      }
                      return this.dtf.format(this._dt.toJSDate());
                    };
                    PolyDateFormatter2.prototype.formatToParts = function() {
                      var _this = this;
                      var parts = this.dtf.formatToParts(this._dt.toJSDate());
                      if (!!this._originalZone) {
                        return parts.map(function(part) {
                          if (part.type === "timeZoneName") {
                            var offsetName = _this._originalZone.offsetName(_this._dt.ts, {
                              locale: _this._dt.locale,
                              format: _this._opts.timeZoneName
                            });
                            return tslib_1.__assign(tslib_1.__assign({}, part), {
                              // tslint:disable-next-line:no-non-null-assertion
                              value: offsetName
                            });
                          } else {
                            return part;
                          }
                        });
                      }
                      return parts;
                    };
                    PolyDateFormatter2.prototype.resolvedOptions = function() {
                      return this._dtf.resolvedOptions();
                    };
                    return PolyDateFormatter2;
                  }()
                );
                exports2.PolyDateFormatter = PolyDateFormatter;
                var PolyRelFormatter = (
                  /** @class */
                  function() {
                    function PolyRelFormatter2(locale, isEnglish, opts) {
                      this._opts = tslib_1.__assign({
                        style: "long"
                      }, opts);
                      if (!isEnglish && (0, util_1.hasRelative)()) {
                        this._rtf = getCachedRTF(locale, opts);
                      }
                    }
                    PolyRelFormatter2.prototype.format = function(count, unit) {
                      if (this._rtf) {
                        return this._rtf.format(count, unit);
                      } else {
                        return English.formatRelativeTime(unit, count, this._opts.numeric, this._opts.style !== "long");
                      }
                    };
                    PolyRelFormatter2.prototype.formatToParts = function(count, unit) {
                      if (this._rtf) {
                        return this._rtf.formatToParts(count, unit);
                      } else {
                        return [];
                      }
                    };
                    return PolyRelFormatter2;
                  }()
                );
                var Locale = (
                  /** @class */
                  function() {
                    function Locale2(locale, numberingSystem, outputCalendar, weekSettings, specifiedLocale) {
                      var _a = parseLocaleString(locale), parsedLocale = _a[0], parsedNumberingSystem = _a[1], parsedOutputCalendar = _a[2];
                      this.locale = parsedLocale;
                      this.numberingSystem = numberingSystem || parsedNumberingSystem;
                      this.outputCalendar = outputCalendar || parsedOutputCalendar;
                      this._intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);
                      this._weekSettings = weekSettings;
                      this._weekdaysCache = {
                        format: {},
                        standalone: {}
                      };
                      this._monthsCache = {
                        format: {},
                        standalone: {}
                      };
                      this._meridiemCache = void 0;
                      this._eraCache = {};
                      this._specifiedLocale = specifiedLocale;
                      this._fastNumbersCached = void 0;
                    }
                    Object.defineProperty(Locale2.prototype, "fastNumbers", {
                      get: function() {
                        if (this._fastNumbersCached === void 0) {
                          this._fastNumbersCached = this._supportsFastNumbers();
                        }
                        return this._fastNumbersCached;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Locale2.create = function(locale, numberingSystem, outputCalendar, weekSettings, defaultToEN) {
                      if (defaultToEN === void 0) {
                        defaultToEN = false;
                      }
                      var specifiedLocale = locale || settings_1.Settings.defaultLocale;
                      var localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale());
                      var numberingSystemR = numberingSystem || settings_1.Settings.defaultNumberingSystem;
                      var outputCalendarR = outputCalendar || settings_1.Settings.defaultOutputCalendar;
                      var weekSettingsR = (0, util_1.validateWeekSettings)(weekSettings) || settings_1.Settings.defaultWeekSettings;
                      return new Locale2(localeR, numberingSystemR, outputCalendarR, weekSettingsR, specifiedLocale);
                    };
                    Locale2.fromObject = function(_a) {
                      var _b = _a === void 0 ? {} : _a, locale = _b.locale, numberingSystem = _b.numberingSystem, outputCalendar = _b.outputCalendar, weekSettings = _b.weekSettings;
                      return Locale2.create(locale, numberingSystem, outputCalendar, weekSettings);
                    };
                    Locale2.fromOpts = function(opts) {
                      return Locale2.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.weekSettings, opts.defaultToEN);
                    };
                    Locale2.resetCache = function() {
                      sysLocaleCache = void 0;
                      intlLFCache = {};
                      intlDTCache = {};
                      intlNumCache = {};
                      intlRelCache = {};
                    };
                    Locale2.prototype.clone = function(alts) {
                      if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
                        return this;
                      } else {
                        return Locale2.create(alts.locale || this._specifiedLocale, alts.numberingSystem || this.numberingSystem, alts.outputCalendar || this.outputCalendar, (0, util_1.validateWeekSettings)(alts.weekSettings) || this._weekSettings, alts.defaultToEN || false);
                      }
                    };
                    Locale2.prototype.dtFormatter = function(dt, intlOptions) {
                      if (intlOptions === void 0) {
                        intlOptions = {};
                      }
                      return new PolyDateFormatter(dt, this._intl, intlOptions);
                    };
                    Locale2.prototype.equals = function(other) {
                      return this.locale === other.locale && this.numberingSystem === other.numberingSystem && this.outputCalendar === other.outputCalendar;
                    };
                    Locale2.prototype.eras = function(length) {
                      var _this = this;
                      return listStuff(this, length, English.eras, function(len) {
                        var intl = {
                          era: len
                        };
                        if (!_this._eraCache[len]) {
                          _this._eraCache[len] = [datetime_1.DateTime.utc(-40, 1, 1), datetime_1.DateTime.utc(2017, 1, 1)].map(function(dt) {
                            return _this.extract(dt, intl, "era");
                          });
                        }
                        return _this._eraCache[len];
                      });
                    };
                    Locale2.prototype.extract = function(dt, intlOptions, field) {
                      var df = this.dtFormatter(dt, intlOptions), results = df.formatToParts(), matching = results.find(function(m) {
                        return m.type.toLowerCase() === field.toLowerCase();
                      });
                      if (!matching) {
                        throw new Error("Invalid extract field ".concat(field));
                      }
                      return matching.value;
                    };
                    Locale2.prototype.getMinDaysInFirstWeek = function() {
                      return this.getWeekSettings().minimalDays;
                    };
                    Locale2.prototype.getStartOfWeek = function() {
                      return this.getWeekSettings().firstDay;
                    };
                    Locale2.prototype.getWeekSettings = function() {
                      if (this._weekSettings) {
                        return this._weekSettings;
                      } else if (!(0, util_1.hasLocaleWeekInfo)()) {
                        return util_1.FALLBACK_WEEK_SETTINGS;
                      } else {
                        return this._getCachedWeekInfo(this.locale);
                      }
                    };
                    Locale2.prototype.getWeekendDays = function() {
                      return this.getWeekSettings().weekend;
                    };
                    Locale2.prototype.isEnglish = function() {
                      return (
                        // tslint:disable-next-line:no-bitwise
                        !!~["en", "en-us"].indexOf(this.locale.toLowerCase()) || new intl_next_1.default.DateTimeFormat(this._intl).resolvedOptions().locale.startsWith("en-us")
                      );
                    };
                    Locale2.prototype.listFormatter = function(opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      return getCachedLF(this._intl, opts);
                    };
                    Locale2.prototype.listingMode = function() {
                      var isActuallyEn = this.isEnglish();
                      var hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
                      return isActuallyEn && hasNoWeirdness ? "en" : "intl";
                    };
                    Locale2.prototype.meridiems = function() {
                      var _this = this;
                      return listStuff(
                        this,
                        "long",
                        // arbitrary unused value
                        function() {
                          return English.meridiems;
                        },
                        function() {
                          if (_this._meridiemCache === void 0) {
                            _this._meridiemCache = [datetime_1.DateTime.utc(2016, 11, 13, 9), datetime_1.DateTime.utc(2016, 11, 13, 19)].map(function(dt) {
                              return _this.extract(dt, {
                                hour: "numeric",
                                hourCycle: "h12"
                              }, "dayPeriod");
                            });
                          }
                          return _this._meridiemCache;
                        }
                      );
                    };
                    Locale2.prototype.months = function(length, format) {
                      var _this = this;
                      if (format === void 0) {
                        format = false;
                      }
                      return listStuff(this, length, English.months, function(len) {
                        var intl = format ? {
                          month: len,
                          day: "numeric"
                        } : {
                          month: len
                        };
                        var formatStr = format ? "format" : "standalone";
                        if (!_this._monthsCache[formatStr][len]) {
                          _this._monthsCache[formatStr][len] = mapMonths(function(dt) {
                            return _this.extract(dt, intl, "month");
                          });
                        }
                        return _this._monthsCache[formatStr][len];
                      });
                    };
                    Locale2.prototype.numberFormatter = function(options) {
                      if (options === void 0) {
                        options = {};
                      }
                      return new PolyNumberFormatter(this._intl, this.fastNumbers, options);
                    };
                    Locale2.prototype.redefaultToEN = function(alts) {
                      if (alts === void 0) {
                        alts = {};
                      }
                      return this.clone(tslib_1.__assign(tslib_1.__assign({}, alts), {
                        defaultToEN: true
                      }));
                    };
                    Locale2.prototype.redefaultToSystem = function(alts) {
                      if (alts === void 0) {
                        alts = {};
                      }
                      return this.clone(tslib_1.__assign(tslib_1.__assign({}, alts), {
                        defaultToEN: false
                      }));
                    };
                    Locale2.prototype.relFormatter = function(options) {
                      if (options === void 0) {
                        options = {};
                      }
                      return new PolyRelFormatter(this._intl, this.isEnglish(), options);
                    };
                    Locale2.prototype.toString = function() {
                      return "Locale(".concat(this.locale, ", ").concat(this.numberingSystem, ", ").concat(this.outputCalendar, ")");
                    };
                    Locale2.prototype.weekdays = function(length, format) {
                      var _this = this;
                      if (format === void 0) {
                        format = false;
                      }
                      return listStuff(this, length, English.weekdays, function(len) {
                        var intl = format ? {
                          weekday: len,
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        } : {
                          weekday: len
                        };
                        var formatStr = format ? "format" : "standalone";
                        if (!_this._weekdaysCache[formatStr][len]) {
                          _this._weekdaysCache[formatStr][len] = mapWeekdays(function(dt) {
                            return _this.extract(dt, intl, "weekday");
                          });
                        }
                        return _this._weekdaysCache[formatStr][len];
                      });
                    };
                    Locale2.prototype._getCachedWeekInfo = function(locString) {
                      var data = Locale2._weekInfoCache[locString];
                      if (!data) {
                        var locale = new intl_next_1.default.Locale(locString);
                        data = "getWeekInfo" in locale ? locale.getWeekInfo() : locale.weekInfo;
                        Locale2._weekInfoCache[locString] = data;
                      }
                      return data;
                    };
                    Locale2.prototype._supportsFastNumbers = function() {
                      if (this.numberingSystem && this.numberingSystem !== "latn") {
                        return false;
                      } else {
                        return this.numberingSystem === "latn" || !this.locale || this.locale.startsWith("en") || intl_next_1.default.DateTimeFormat(this._intl).resolvedOptions().numberingSystem === "latn";
                      }
                    };
                    Locale2._weekInfoCache = {};
                    return Locale2;
                  }()
                );
                exports2.Locale = Locale;
              }
            ),
            /***/
            "./src/impl/regexParser.ts": (
              /*!*********************************!*\
                !*** ./src/impl/regexParser.ts ***!
                \*********************************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.parseSQL = exports2.parseRFC2822Date = exports2.parseISOTimeOnly = exports2.parseISODuration = exports2.parseISODate = exports2.parseHTTPDate = exports2.IANA_REGEX = void 0;
                var tslib_1 = __webpack_require__2(
                  /*! tslib */
                  "./node_modules/tslib/tslib.es6.js"
                );
                var util_1 = __webpack_require__2(
                  /*! ./util */
                  "./src/impl/util.ts"
                );
                var English = tslib_1.__importStar(__webpack_require__2(
                  /*! ./english */
                  "./src/impl/english.ts"
                ));
                var fixedOffsetZone_1 = __webpack_require__2(
                  /*! ../zones/fixedOffsetZone */
                  "./src/zones/fixedOffsetZone.ts"
                );
                var IANAZone_1 = __webpack_require__2(
                  /*! ../zones/IANAZone */
                  "./src/zones/IANAZone.ts"
                );
                function combineRegexes() {
                  var regexes = [];
                  for (var _i = 0; _i < arguments.length; _i++) {
                    regexes[_i] = arguments[_i];
                  }
                  var full = regexes.reduce(function(f, r) {
                    return f + r.source;
                  }, "");
                  return RegExp("^".concat(full, "$"));
                }
                function combineExtractors() {
                  var extractors = [];
                  for (var _i = 0; _i < arguments.length; _i++) {
                    extractors[_i] = arguments[_i];
                  }
                  return function(m) {
                    return extractors.reduce(function(_a, ex) {
                      var mergedVals = _a[0], mergedZone = _a[1], cursor = _a[2];
                      var _b = ex(m, cursor), val = _b[0], zone = _b[1], next = _b[2];
                      return [tslib_1.__assign(tslib_1.__assign({}, mergedVals), val), zone || mergedZone, next];
                    }, [{}, null, 1]).slice(0, 2);
                  };
                }
                function parse(s) {
                  var patterns = [];
                  for (var _i = 1; _i < arguments.length; _i++) {
                    patterns[_i - 1] = arguments[_i];
                  }
                  if (s === void 0 || s === null) {
                    return [null, null];
                  }
                  for (var _a = 0, patterns_1 = patterns; _a < patterns_1.length; _a++) {
                    var _b = patterns_1[_a], regex = _b[0], extractor = _b[1];
                    var m = regex.exec(s);
                    if (!!m) {
                      return extractor(m);
                    }
                  }
                  return [null, null];
                }
                function simpleParse() {
                  var keys = [];
                  for (var _i = 0; _i < arguments.length; _i++) {
                    keys[_i] = arguments[_i];
                  }
                  return function(match, cursor) {
                    var ret = {};
                    var i;
                    for (i = 0; i < keys.length; i++) {
                      ret[keys[i]] = (0, util_1.parseInteger)(match[cursor + i]);
                    }
                    return [ret, null, cursor + i];
                  };
                }
                exports2.IANA_REGEX = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
                var offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/;
                var isoExtendedZone = "(?:".concat(offsetRegex.source, "?(?:\\[(").concat(exports2.IANA_REGEX.source, ")\\])?)?");
                var isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/;
                var isoTimeRegex = RegExp("".concat(isoTimeBaseRegex.source).concat(isoExtendedZone));
                var isoTimeExtensionRegex = RegExp("(?:T".concat(isoTimeRegex.source, ")?"));
                var isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/;
                var isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/;
                var isoOrdinalRegex = /(\d{4})-?(\d{3})/;
                var extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekday");
                var extractISOOrdinalData = simpleParse("year", "ordinal");
                var sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/;
                var sqlTimeRegex = RegExp("".concat(isoTimeBaseRegex.source, " ?(?:").concat(offsetRegex.source, "|(").concat(exports2.IANA_REGEX.source, "))?"));
                var sqlTimeExtensionRegex = RegExp("(?: ".concat(sqlTimeRegex.source, ")?"));
                function int(match, pos, fallback) {
                  return (0, util_1.isUndefined)(match[pos]) ? fallback : (0, util_1.parseInteger)(match[pos]);
                }
                function extractISOYmd(match, cursor) {
                  var item = {
                    year: int(match, cursor, 0),
                    // 0 default value never used?
                    month: int(match, cursor + 1, 1),
                    day: int(match, cursor + 2, 1)
                  };
                  return [item, null, cursor + 3];
                }
                function extractISOTime(match, cursor) {
                  var item = {
                    hour: int(match, cursor, 0),
                    minute: int(match, cursor + 1, 0),
                    second: int(match, cursor + 2, 0),
                    millisecond: (0, util_1.parseMillis)(match[cursor + 3])
                  };
                  return [item, null, cursor + 4];
                }
                function extractISOOffset(match, cursor) {
                  var local = !match[cursor] && !match[cursor + 1], fullOffset = (0, util_1.signedOffset)(match[cursor + 1], match[cursor + 2]), zone = local ? null : fixedOffsetZone_1.FixedOffsetZone.instance(fullOffset);
                  return [{}, zone, cursor + 3];
                }
                function extractIANAZone(match, cursor) {
                  var zone = match[cursor] ? IANAZone_1.IANAZone.create(match[cursor]) : null;
                  return [{}, zone, cursor + 1];
                }
                var isoTimeOnly = RegExp("^T?".concat(isoTimeBaseRegex.source, "$"));
                var isoDuration = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
                function extractISODuration(match) {
                  var s = match[0], yearStr = match[1], monthStr = match[2], weekStr = match[3], dayStr = match[4], hourStr = match[5], minuteStr = match[6], secondStr = match[7], millisecondsStr = match[8];
                  var hasNegativePrefix = s.startsWith("-");
                  var negativeSeconds = !!secondStr && secondStr.startsWith("-");
                  var maybeNegate = function(num, force) {
                    if (force === void 0) {
                      force = false;
                    }
                    return typeof num === "number" && (force || num && hasNegativePrefix) ? -num : num;
                  };
                  return [{
                    years: maybeNegate((0, util_1.parseFloating)(yearStr)),
                    months: maybeNegate((0, util_1.parseFloating)(monthStr)),
                    weeks: maybeNegate((0, util_1.parseFloating)(weekStr)),
                    days: maybeNegate((0, util_1.parseFloating)(dayStr)),
                    hours: maybeNegate((0, util_1.parseFloating)(hourStr)),
                    minutes: maybeNegate((0, util_1.parseFloating)(minuteStr)),
                    seconds: maybeNegate((0, util_1.parseFloating)(secondStr), secondStr === "-0"),
                    milliseconds: maybeNegate((0, util_1.parseMillis)(millisecondsStr), negativeSeconds)
                  }];
                }
                var obsOffsets = {
                  GMT: 0,
                  EDT: -4 * 60,
                  EST: -5 * 60,
                  CDT: -5 * 60,
                  CST: -6 * 60,
                  MDT: -6 * 60,
                  MST: -7 * 60,
                  PDT: -7 * 60,
                  PST: -8 * 60
                };
                function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
                  var weekday;
                  if (weekdayStr) {
                    weekday = weekdayStr.length > 3 ? English.weekdaysLong.indexOf(weekdayStr) + 1 : English.weekdaysShort.indexOf(weekdayStr) + 1;
                  }
                  var year = yearStr.length === 2 ? (0, util_1.untruncateYear)((0, util_1.parseInteger)(yearStr)) : (0, util_1.parseInteger)(yearStr);
                  return {
                    year,
                    month: English.monthsShort.indexOf(monthStr) + 1,
                    day: (0, util_1.parseInteger)(dayStr),
                    hour: (0, util_1.parseInteger)(hourStr),
                    minute: (0, util_1.parseInteger)(minuteStr),
                    second: (0, util_1.parseInteger)(secondStr),
                    weekday
                  };
                }
                var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
                function extractRFC2822(match) {
                  var weekdayStr = match[1], dayStr = match[2], monthStr = match[3], yearStr = match[4], hourStr = match[5], minuteStr = match[6], secondStr = match[7], obsOffset = match[8], milOffset = match[9], offHourStr = match[10], offMinuteStr = match[11], result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
                  var offset;
                  if (obsOffset) {
                    offset = obsOffsets[obsOffset];
                  } else if (milOffset) {
                    offset = 0;
                  } else {
                    offset = (0, util_1.signedOffset)(offHourStr, offMinuteStr);
                  }
                  return [result, new fixedOffsetZone_1.FixedOffsetZone(offset)];
                }
                function preprocessRFC2822(s) {
                  return s.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
                }
                var rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, rfc850 = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
                function extractRFC1123Or850(match) {
                  var weekdayStr = match[1], dayStr = match[2], monthStr = match[3], yearStr = match[4], hourStr = match[5], minuteStr = match[6], secondStr = match[7], result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
                  return [result, fixedOffsetZone_1.FixedOffsetZone.utcInstance];
                }
                function extractASCII(match) {
                  var weekdayStr = match[1], monthStr = match[2], dayStr = match[3], hourStr = match[4], minuteStr = match[5], secondStr = match[6], yearStr = match[7], result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
                  return [result, fixedOffsetZone_1.FixedOffsetZone.utcInstance];
                }
                var isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
                var isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
                var isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
                var isoTimeCombinedRegex = combineRegexes(isoTimeRegex);
                var extractISOYmdTimeAndOffset = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset, extractIANAZone);
                var extractISOWeekTimeAndOffset = combineExtractors(extractISOWeekData, extractISOTime, extractISOOffset, extractIANAZone);
                var extractISOOrdinalDateAndTime = combineExtractors(extractISOOrdinalData, extractISOTime, extractISOOffset, extractIANAZone);
                var extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
                function parseHTTPDate(s) {
                  return parse(s, [rfc1123, extractRFC1123Or850], [rfc850, extractRFC1123Or850], [ascii, extractASCII]);
                }
                exports2.parseHTTPDate = parseHTTPDate;
                function parseISODate(s) {
                  return parse(s, [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset], [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime], [isoTimeCombinedRegex, extractISOTimeAndOffset]);
                }
                exports2.parseISODate = parseISODate;
                function parseISODuration(s) {
                  return parse(s, [isoDuration, extractISODuration]);
                }
                exports2.parseISODuration = parseISODuration;
                function parseISOTimeOnly(s) {
                  return parse(s, [isoTimeOnly, combineExtractors(extractISOTime)]);
                }
                exports2.parseISOTimeOnly = parseISOTimeOnly;
                function parseRFC2822Date(s) {
                  return parse(preprocessRFC2822(s), [rfc2822, extractRFC2822]);
                }
                exports2.parseRFC2822Date = parseRFC2822Date;
                var sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
                var sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);
                var extractISOTimeOffsetAndIANAZone = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
                function parseSQL(s) {
                  return parse(s, [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]);
                }
                exports2.parseSQL = parseSQL;
              }
            ),
            /***/
            "./src/impl/tokenParser.ts": (
              /*!*********************************!*\
                !*** ./src/impl/tokenParser.ts ***!
                \*********************************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.formatOptsToTokens = exports2.parseFromTokens = exports2.sanitizeSpaces = exports2.explainFromTokens = exports2.TokenParser = exports2.expandMacroTokens = void 0;
                var tslib_1 = __webpack_require__2(
                  /*! tslib */
                  "./node_modules/tslib/tslib.es6.js"
                );
                var util_1 = __webpack_require__2(
                  /*! ./util */
                  "./src/impl/util.ts"
                );
                var formatter_1 = __webpack_require__2(
                  /*! ./formatter */
                  "./src/impl/formatter.ts"
                );
                var fixedOffsetZone_1 = __webpack_require__2(
                  /*! ../zones/fixedOffsetZone */
                  "./src/zones/fixedOffsetZone.ts"
                );
                var IANAZone_1 = __webpack_require__2(
                  /*! ../zones/IANAZone */
                  "./src/zones/IANAZone.ts"
                );
                var digits_1 = __webpack_require__2(
                  /*! ./digits */
                  "./src/impl/digits.ts"
                );
                var datetime_1 = __webpack_require__2(
                  /*! ../datetime */
                  "./src/datetime.ts"
                );
                var errors_1 = __webpack_require__2(
                  /*! ../errors */
                  "./src/errors.ts"
                );
                var missingFtp = "missing Intl.DateTimeFormat.formatToParts support";
                function intUnit(regex, post) {
                  if (post === void 0) {
                    post = function(i) {
                      return i;
                    };
                  }
                  return {
                    regex,
                    deser: function(_a) {
                      var s = _a[0];
                      return post((0, digits_1.parseDigits)(s));
                    }
                  };
                }
                var spaceOrNBSPPattern = "[ ".concat(String.fromCharCode(160), "]");
                var spaceOrNBSPRegExp = new RegExp(spaceOrNBSPPattern, "g");
                function fixListRegex(s) {
                  return s.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSPPattern);
                }
                function stripInsensitivities(s) {
                  return s.replace(/\./g, "").replace(spaceOrNBSPRegExp, " ").toLowerCase();
                }
                function oneOf(strings, startIndex) {
                  return {
                    regex: RegExp(strings.map(fixListRegex).join("|")),
                    deser: function(_a) {
                      var s = _a[0];
                      return strings.findIndex(function(i) {
                        return stripInsensitivities(s) === stripInsensitivities(i);
                      }) + startIndex;
                    }
                  };
                }
                function offset(regex, groups) {
                  return {
                    regex,
                    deser: function(_a) {
                      var h = _a[1], m = _a[2];
                      return (0, util_1.signedOffset)(h, m);
                    },
                    groups
                  };
                }
                function simple(regex) {
                  return {
                    regex,
                    deser: function(_a) {
                      var s = _a[0];
                      return s;
                    }
                  };
                }
                function escapeToken(value) {
                  return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
                }
                function unitForToken(token, loc) {
                  var one = (0, digits_1.digitRegex)(loc), two = (0, digits_1.digitRegex)(loc, "{2}"), three = (0, digits_1.digitRegex)(loc, "{3}"), four = (0, digits_1.digitRegex)(loc, "{4}"), six = (0, digits_1.digitRegex)(loc, "{6}"), oneOrTwo = (0, digits_1.digitRegex)(loc, "{1,2}"), oneToThree = (0, digits_1.digitRegex)(loc, "{1,3}"), oneToSix = (0, digits_1.digitRegex)(loc, "{1,6}"), oneToNine = (0, digits_1.digitRegex)(loc, "{1,9}"), twoToFour = (0, digits_1.digitRegex)(loc, "{2,4}"), fourToSix = (0, digits_1.digitRegex)(loc, "{4,6}"), literal = function(t) {
                    return {
                      regex: RegExp(escapeToken(t.val)),
                      deser: function(_a) {
                        var s = _a[0];
                        return s;
                      },
                      literal: true
                    };
                  }, unitate = function(t) {
                    if (token.literal) {
                      return literal(t);
                    }
                    switch (t.val) {
                      case "G":
                        return oneOf(loc.eras("short"), 0);
                      case "GG":
                        return oneOf(loc.eras("long"), 0);
                      case "y":
                        return intUnit(oneToSix);
                      case "yy":
                        return intUnit(twoToFour, util_1.untruncateYear);
                      case "yyyy":
                        return intUnit(four);
                      case "yyyyy":
                        return intUnit(fourToSix);
                      case "yyyyyy":
                        return intUnit(six);
                      case "M":
                        return intUnit(oneOrTwo);
                      case "MM":
                        return intUnit(two);
                      case "MMM":
                        return oneOf(loc.months("short", true), 1);
                      case "MMMM":
                        return oneOf(loc.months("long", true), 1);
                      case "L":
                        return intUnit(oneOrTwo);
                      case "LL":
                        return intUnit(two);
                      case "LLL":
                        return oneOf(loc.months("short", false), 1);
                      case "LLLL":
                        return oneOf(loc.months("long", false), 1);
                      case "d":
                        return intUnit(oneOrTwo);
                      case "dd":
                        return intUnit(two);
                      case "o":
                        return intUnit(oneToThree);
                      case "ooo":
                        return intUnit(three);
                      case "HH":
                        return intUnit(two);
                      case "H":
                        return intUnit(oneOrTwo);
                      case "hh":
                        return intUnit(two);
                      case "h":
                        return intUnit(oneOrTwo);
                      case "mm":
                        return intUnit(two);
                      case "m":
                        return intUnit(oneOrTwo);
                      case "q":
                        return intUnit(oneOrTwo);
                      case "qq":
                        return intUnit(two);
                      case "s":
                        return intUnit(oneOrTwo);
                      case "ss":
                        return intUnit(two);
                      case "S":
                        return intUnit(oneToThree);
                      case "SSS":
                        return intUnit(three);
                      case "u":
                        return simple(oneToNine);
                      case "a":
                        return oneOf(loc.meridiems(), 0);
                      case "kkkk":
                        return intUnit(four);
                      case "kk":
                        return intUnit(twoToFour, util_1.untruncateYear);
                      case "W":
                        return intUnit(oneOrTwo);
                      case "WW":
                        return intUnit(two);
                      case "E":
                      case "c":
                        return intUnit(one);
                      case "EEE":
                        return oneOf(loc.weekdays("short", false), 1);
                      case "EEEE":
                        return oneOf(loc.weekdays("long", false), 1);
                      case "ccc":
                        return oneOf(loc.weekdays("short", true), 1);
                      case "cccc":
                        return oneOf(loc.weekdays("long", true), 1);
                      case "Z":
                      case "ZZ":
                        return offset(new RegExp("([+-]".concat(oneOrTwo.source, ")(?::(").concat(two.source, "))?")), 2);
                      case "ZZZ":
                        return offset(new RegExp("([+-]".concat(oneOrTwo.source, ")(").concat(two.source, ")?")), 2);
                      case "z":
                        return simple(/[a-z_+-/]{1,256}?/i);
                      default:
                        return literal(t);
                    }
                  };
                  var unit = unitate(token) || {
                    invalidReason: missingFtp
                  };
                  return tslib_1.__assign(tslib_1.__assign({}, unit), {
                    token
                  });
                }
                var partTypeStyleToTokenVal = {
                  year: {
                    "2-digit": "yy",
                    numeric: "yyyyy"
                  },
                  month: {
                    numeric: "M",
                    "2-digit": "MM",
                    short: "MMM",
                    long: "MMMM"
                  },
                  day: {
                    numeric: "d",
                    "2-digit": "dd"
                  },
                  weekday: {
                    short: "EEE",
                    long: "EEEE"
                  },
                  dayPeriod: "a",
                  hour12: {
                    numeric: "h",
                    "2-digit": "hh"
                  },
                  hour24: {
                    numeric: "H",
                    "2-digit": "HH"
                  },
                  hour: {
                    numeric: "h",
                    "2-digit": "hh"
                  },
                  minute: {
                    numeric: "m",
                    "2-digit": "mm"
                  },
                  second: {
                    numeric: "s",
                    "2-digit": "ss"
                  },
                  timeZoneName: {
                    long: "ZZZZZ",
                    short: "ZZZ"
                  }
                };
                function tokenForPart(part, formatOpts, resolvedOpts) {
                  var type = part.type, value = part.value;
                  if (type === "literal") {
                    var isSpace = /^\s+$/.test(value);
                    return {
                      literal: !isSpace,
                      val: isSpace ? " " : value
                    };
                  }
                  var style2 = formatOpts[type];
                  var actualType = type;
                  if (type === "hour") {
                    if (formatOpts.hour12 != null) {
                      actualType = formatOpts.hour12 ? "hour12" : "hour24";
                    } else if (formatOpts.hourCycle != null) {
                      if (formatOpts.hourCycle === "h11" || formatOpts.hourCycle === "h12") {
                        actualType = "hour12";
                      } else {
                        actualType = "hour24";
                      }
                    } else {
                      actualType = resolvedOpts.hour12 ? "hour12" : "hour24";
                    }
                  }
                  var val = partTypeStyleToTokenVal[actualType];
                  if (typeof val === "object") {
                    val = val[style2];
                  }
                  if (val) {
                    return {
                      literal: false,
                      val
                    };
                  }
                  return void 0;
                }
                function buildRegex(units) {
                  var re = units.map(function(u) {
                    return u.regex;
                  }).reduce(function(f, r) {
                    return "".concat(f, "(").concat(r.source, ")");
                  }, "");
                  return ["^".concat(re, "$"), units];
                }
                function match(input, regex, handlers) {
                  var matches = regex.exec(input);
                  var all = {};
                  if (matches !== null) {
                    var matchIndex_1 = 1;
                    handlers.forEach(function(h) {
                      var groups = h.groups ? h.groups + 1 : 1;
                      if (!h.literal) {
                        all[h.token.val[0]] = h.deser(matches.slice(matchIndex_1, matchIndex_1 + groups));
                      }
                      matchIndex_1 += groups;
                    });
                  }
                  return [matches, all];
                }
                function dateTimeFromMatches(matches) {
                  var toField = function(token) {
                    switch (token) {
                      case "S":
                        return "millisecond";
                      case "s":
                        return "second";
                      case "m":
                        return "minute";
                      case "h":
                      case "H":
                        return "hour";
                      case "d":
                        return "day";
                      case "o":
                        return "ordinal";
                      case "L":
                      case "M":
                        return "month";
                      case "y":
                        return "year";
                      case "E":
                      case "c":
                        return "weekday";
                      case "W":
                        return "weekNumber";
                      case "k":
                        return "weekYear";
                      case "q":
                        return "quarter";
                      default:
                        return null;
                    }
                  };
                  var zone = null;
                  var specificOffset;
                  if ((0, util_1.isDefined)(matches.z)) {
                    zone = IANAZone_1.IANAZone.create(matches.z);
                  }
                  if ((0, util_1.isDefined)(matches.Z)) {
                    if (!zone) {
                      zone = new fixedOffsetZone_1.FixedOffsetZone(+matches.Z);
                    }
                    specificOffset = +matches.Z;
                  }
                  if ((0, util_1.isDefined)(matches.q)) {
                    matches.M = (matches.q - 1) * 3 + 1;
                  }
                  if ((0, util_1.isDefined)(matches.h)) {
                    if (+matches.h < 12 && matches.a === 1) {
                      matches.h = matches.h + 12;
                    } else if (matches.h === 12 && matches.a === 0) {
                      matches.h = 0;
                    }
                  }
                  if (matches.G === 0 && matches.y) {
                    matches.y = -matches.y;
                  }
                  if ((0, util_1.isDefined)(matches.u)) {
                    matches.S = (0, util_1.parseMillis)(matches.u) || 0;
                  }
                  var values = Object.keys(matches).reduce(function(r, k) {
                    var f = toField(k);
                    if (f) {
                      r[f] = matches[k];
                    }
                    return r;
                  }, {});
                  return [values, zone, specificOffset];
                }
                var dummyDateTimeCache;
                function getDummyDateTime(locale) {
                  if (dummyDateTimeCache === void 0) {
                    dummyDateTimeCache = datetime_1.DateTime.fromMillis(1555555555555, {
                      locale: locale.locale
                    });
                  }
                  return dummyDateTimeCache;
                }
                function maybeExpandMacroToken(token, locale) {
                  if (token.literal) {
                    return token;
                  }
                  var formatOpts = formatter_1.Formatter.macroTokenToFormatOpts(token.val);
                  var tokens = formatOptsToTokens(formatOpts, locale);
                  if (tokens == null || tokens.includes(void 0)) {
                    return token;
                  }
                  return tokens;
                }
                function expandMacroTokens(tokens, locale) {
                  var _a;
                  return (_a = Array.prototype).concat.apply(_a, tokens.map(function(t) {
                    return maybeExpandMacroToken(t, locale);
                  }));
                }
                exports2.expandMacroTokens = expandMacroTokens;
                var TokenParser = (
                  /** @class */
                  function() {
                    function TokenParser2(locale, format) {
                      this.locale = locale;
                      this.format = format;
                      this._mapTokens();
                    }
                    Object.defineProperty(TokenParser2.prototype, "invalidReason", {
                      get: function() {
                        return this.disqualifyingUnit ? this.disqualifyingUnit.invalidReason : null;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(TokenParser2.prototype, "isValid", {
                      get: function() {
                        return !this.disqualifyingUnit;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    TokenParser2.prototype.explainFromTokens = function(input) {
                      if (!this.isValid) {
                        return {
                          input,
                          tokens: this.tokens,
                          invalidReason: this.invalidReason
                        };
                      } else {
                        var _a = match(input, this.regex, this.handlers), rawMatches = _a[0], matches = _a[1], _b = matches ? dateTimeFromMatches(matches) : [null, null, void 0], result = _b[0], zone = _b[1], specificOffset = _b[2];
                        if (matches.hasOwnProperty("a") && matches.hasOwnProperty("H")) {
                          throw new errors_1.ConflictingSpecificationError("Can't include meridiem when specifying 24-hour format");
                        }
                        return {
                          input,
                          tokens: this.tokens,
                          regex: this.regex,
                          rawMatches,
                          matches,
                          result,
                          zone,
                          specificOffset
                        };
                      }
                    };
                    TokenParser2.prototype._mapTokens = function() {
                      var _this = this;
                      this.tokens = expandMacroTokens(formatter_1.Formatter.parseFormat(this.format), this.locale);
                      var units = this.tokens.map(function(t) {
                        return unitForToken(t, _this.locale);
                      });
                      this.disqualifyingUnit = units.find(function(t) {
                        return t.invalidReason;
                      });
                      this.units = units.filter(function(u) {
                        return !u.invalidReason;
                      });
                      if (!this.disqualifyingUnit) {
                        var _a = buildRegex(this.units), regexString = _a[0], handlers = _a[1];
                        this.regex = RegExp(regexString, "i");
                        this.handlers = handlers;
                      }
                    };
                    return TokenParser2;
                  }()
                );
                exports2.TokenParser = TokenParser;
                function explainFromTokens(locale, input, format) {
                  var parser = new TokenParser(locale, format);
                  return parser.explainFromTokens(input);
                }
                exports2.explainFromTokens = explainFromTokens;
                function sanitizeSpaces(input) {
                  return input.replace(/\u202F/g, " ");
                }
                exports2.sanitizeSpaces = sanitizeSpaces;
                function parseFromTokens(locale, input, format) {
                  var _a = explainFromTokens(locale, sanitizeSpaces(input), sanitizeSpaces(format)), result = _a.result, zone = _a.zone, specificOffset = _a.specificOffset, invalidReason = _a.invalidReason;
                  return [result, zone, specificOffset, invalidReason];
                }
                exports2.parseFromTokens = parseFromTokens;
                function formatOptsToTokens(formatOpts, locale) {
                  if (!formatOpts) {
                    return null;
                  }
                  var formatter = formatter_1.Formatter.create(locale, formatOpts);
                  var df = formatter.dtFormatter(getDummyDateTime(locale));
                  var parts = df.formatToParts();
                  var resolvedOpts = df.resolvedOptions();
                  return parts.map(function(p) {
                    return tokenForPart(p, formatOpts, resolvedOpts);
                  });
                }
                exports2.formatOptsToTokens = formatOptsToTokens;
              }
            ),
            /***/
            "./src/impl/util.ts": (
              /*!**************************!*\
                !*** ./src/impl/util.ts ***!
                \**************************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.FALLBACK_WEEK_SETTINGS = exports2.PLURAL_MAPPING = exports2.HUMAN_ORDERED_UNITS = exports2.REVERSE_ORDERED_UNITS = exports2.ORDERED_UNITS = exports2.timeObject = exports2.formatOffset = exports2.normalizeObject = exports2.asNumber = exports2.signedOffset = exports2.parseZoneInfo = exports2.untruncateYear = exports2.weeksInWeekYear = exports2.objToLocalTS = exports2.daysInMonth = exports2.daysInYear = exports2.isLeapYear = exports2.roundTo = exports2.parseMillis = exports2.parseFloating = exports2.parseInteger = exports2.padStart = exports2.floorMod = exports2.integerBetween = exports2.validateWeekSettings = exports2.pick = exports2.bestBy = exports2.maybeArray = exports2.hasLocaleWeekInfo = exports2.hasRelative = exports2.isDate = exports2.isString = exports2.isInteger = exports2.isNumber = exports2.isUndefined = exports2.isDefined = void 0;
                var tslib_1 = __webpack_require__2(
                  /*! tslib */
                  "./node_modules/tslib/tslib.es6.js"
                );
                var errors_1 = __webpack_require__2(
                  /*! ../errors */
                  "./src/errors.ts"
                );
                var settings_1 = __webpack_require__2(
                  /*! ../settings */
                  "./src/settings.ts"
                );
                var conversions_1 = __webpack_require__2(
                  /*! ./conversions */
                  "./src/impl/conversions.ts"
                );
                var intl_next_1 = tslib_1.__importDefault(__webpack_require__2(
                  /*! ../types/intl-next */
                  "./src/types/intl-next.ts"
                ));
                function isDefined(o) {
                  return typeof o !== "undefined";
                }
                exports2.isDefined = isDefined;
                function isUndefined(o) {
                  return typeof o === "undefined";
                }
                exports2.isUndefined = isUndefined;
                function isNumber(o) {
                  return typeof o === "number";
                }
                exports2.isNumber = isNumber;
                function isInteger(o) {
                  return isNumber(o) && o % 1 === 0;
                }
                exports2.isInteger = isInteger;
                function isString(o) {
                  return typeof o === "string";
                }
                exports2.isString = isString;
                function isDate(o) {
                  return Object.prototype.toString.call(o) === "[object Date]";
                }
                exports2.isDate = isDate;
                function hasRelative() {
                  try {
                    return typeof intl_next_1.default !== "undefined" && !!intl_next_1.default.RelativeTimeFormat;
                  } catch (e) {
                    return false;
                  }
                }
                exports2.hasRelative = hasRelative;
                function hasLocaleWeekInfo() {
                  try {
                    return typeof intl_next_1.default !== "undefined" && !!intl_next_1.default.Locale && ("weekInfo" in intl_next_1.default.Locale.prototype || "getWeekInfo" in intl_next_1.default.Locale.prototype);
                  } catch (e) {
                    return false;
                  }
                }
                exports2.hasLocaleWeekInfo = hasLocaleWeekInfo;
                function maybeArray(thing) {
                  return Array.isArray(thing) ? thing : [thing];
                }
                exports2.maybeArray = maybeArray;
                function bestBy(arr, by, compare) {
                  if (arr.length === 0) {
                    return void 0;
                  }
                  var bestResult = arr.reduce(function(best, next) {
                    var pair = [by(next), next];
                    if (compare(best[0], pair[0]) === best[0]) {
                      return best;
                    }
                    return pair;
                  }, [by(arr[0]), arr[0]]);
                  return bestResult[1];
                }
                exports2.bestBy = bestBy;
                function pick(obj, keys) {
                  return keys.reduce(function(a, k) {
                    a[k] = obj[k];
                    return a;
                  }, {});
                }
                exports2.pick = pick;
                function validateWeekSettings(settings) {
                  if (!settings) {
                    return void 0;
                  } else if (typeof settings !== "object") {
                    throw new errors_1.InvalidArgumentError("Week settings must be an object");
                  } else {
                    if (!integerBetween(settings.firstDay, 1, 7) || !integerBetween(settings.minimalDays, 1, 7) || !Array.isArray(settings.weekend) || settings.weekend.some(function(v) {
                      return !integerBetween(v, 1, 7);
                    })) {
                      throw new errors_1.InvalidArgumentError("Invalid week settings");
                    }
                    return {
                      firstDay: settings.firstDay,
                      minimalDays: settings.minimalDays,
                      weekend: settings.weekend
                    };
                  }
                }
                exports2.validateWeekSettings = validateWeekSettings;
                function integerBetween(thing, bottom, top) {
                  return isInteger(thing) && thing >= bottom && thing <= top;
                }
                exports2.integerBetween = integerBetween;
                function floorMod(x, n) {
                  return x - n * Math.floor(x / n);
                }
                exports2.floorMod = floorMod;
                function padStart(input, n) {
                  if (n === void 0) {
                    n = 2;
                  }
                  var minus = +input < 0 ? "-" : "";
                  var target = minus ? +input * -1 : input;
                  var result;
                  if (target.toString().length < n) {
                    result = ("0".repeat(n) + target).slice(-n);
                  } else {
                    result = target.toString();
                  }
                  return "".concat(minus).concat(result);
                }
                exports2.padStart = padStart;
                function parseInteger(text) {
                  if (!!text) {
                    return parseInt(text, 10);
                  }
                  return void 0;
                }
                exports2.parseInteger = parseInteger;
                function parseFloating(text) {
                  if (!!text) {
                    return parseFloat(text);
                  }
                  return void 0;
                }
                exports2.parseFloating = parseFloating;
                function parseMillis(fraction) {
                  if (isUndefined(fraction) || fraction === null || fraction === "") {
                    return void 0;
                  } else {
                    var f = parseFloat("0." + fraction) * 1e3;
                    return Math.floor(f);
                  }
                }
                exports2.parseMillis = parseMillis;
                function roundTo(value, digits, towardZero) {
                  if (towardZero === void 0) {
                    towardZero = false;
                  }
                  var factor = Math.pow(10, digits), rounder = towardZero ? Math.trunc : Math.round;
                  return rounder(value * factor) / factor;
                }
                exports2.roundTo = roundTo;
                function isLeapYear(year) {
                  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
                }
                exports2.isLeapYear = isLeapYear;
                function daysInYear(year) {
                  return isLeapYear(year) ? 366 : 365;
                }
                exports2.daysInYear = daysInYear;
                function daysInMonth(year, month) {
                  var modMonth = floorMod(month - 1, 12) + 1, modYear = year + (month - modMonth) / 12;
                  return [31, isLeapYear(modYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
                }
                exports2.daysInMonth = daysInMonth;
                function objToLocalTS(obj) {
                  var d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond);
                  if (obj.year < 100 && obj.year >= 0) {
                    d = new Date(d);
                    d.setUTCFullYear(obj.year, obj.month - 1, obj.day);
                  }
                  return +d;
                }
                exports2.objToLocalTS = objToLocalTS;
                function firstWeekOffset(year, minDaysInFirstWeek, startOfWeek) {
                  var fwdlw = (0, conversions_1.isoWeekdayToLocal)((0, conversions_1.dayOfWeek)(year, 1, minDaysInFirstWeek), startOfWeek);
                  return -fwdlw + minDaysInFirstWeek - 1;
                }
                function weeksInWeekYear(weekYear, minDaysInFirstWeek, startOfWeek) {
                  if (minDaysInFirstWeek === void 0) {
                    minDaysInFirstWeek = 4;
                  }
                  if (startOfWeek === void 0) {
                    startOfWeek = 1;
                  }
                  var weekOffset = firstWeekOffset(weekYear, minDaysInFirstWeek, startOfWeek);
                  var weekOffsetNext = firstWeekOffset(weekYear + 1, minDaysInFirstWeek, startOfWeek);
                  return (daysInYear(weekYear) - weekOffset + weekOffsetNext) / 7;
                }
                exports2.weeksInWeekYear = weeksInWeekYear;
                function untruncateYear(year) {
                  if (year > 99) {
                    return year;
                  } else {
                    return year > settings_1.Settings.twoDigitCutoffYear ? 1900 + year : 2e3 + year;
                  }
                }
                exports2.untruncateYear = untruncateYear;
                function parseZoneInfo(ts, offsetFormat, locale, timeZone) {
                  var date = new Date(ts);
                  var intlOpts = {
                    hourCycle: "h23",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone
                  };
                  var modified = tslib_1.__assign({
                    timeZoneName: offsetFormat
                  }, intlOpts);
                  var parsed = new intl_next_1.default.DateTimeFormat(locale, modified).formatToParts(date).find(function(m) {
                    return m.type.toLowerCase() === "timezonename";
                  });
                  return parsed ? parsed.value : null;
                }
                exports2.parseZoneInfo = parseZoneInfo;
                function signedOffset(offHourStr, offMinuteStr) {
                  var offHour = parseInt(offHourStr, 10);
                  if (Number.isNaN(offHour)) {
                    offHour = 0;
                  }
                  var offMin = parseInt(offMinuteStr, 10) || 0, offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
                  return offHour * 60 + offMinSigned;
                }
                exports2.signedOffset = signedOffset;
                function asNumber(value) {
                  var numericValue = Number(value);
                  if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue)) {
                    throw new errors_1.InvalidArgumentError("Invalid unit value ".concat(value));
                  }
                  return numericValue;
                }
                exports2.asNumber = asNumber;
                function normalizeObject(obj, normalizer) {
                  return Object.keys(obj).reduce(function(acc, u) {
                    obj[u] !== void 0 && obj[u] !== null && (acc[normalizer(u)] = asNumber(obj[u]));
                    return acc;
                  }, {});
                }
                exports2.normalizeObject = normalizeObject;
                function formatOffset(offset, format) {
                  var hours = Math.trunc(Math.abs(offset / 60)), minutes = Math.trunc(Math.abs(offset % 60)), sign = offset >= 0 ? "+" : "-";
                  switch (format) {
                    case "short":
                      return "".concat(sign).concat(padStart(hours, 2), ":").concat(padStart(minutes, 2));
                    case "narrow":
                      return "".concat(sign).concat(hours).concat(minutes > 0 ? ":".concat(minutes) : "");
                    case "techie":
                      return "".concat(sign).concat(padStart(hours, 2)).concat(padStart(minutes, 2));
                    default:
                      throw new RangeError("Value format ".concat(format, " is out of range for property format"));
                  }
                }
                exports2.formatOffset = formatOffset;
                function timeObject(obj) {
                  return pick(obj, ["hour", "minute", "second", "millisecond"]);
                }
                exports2.timeObject = timeObject;
                exports2.ORDERED_UNITS = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"];
                exports2.REVERSE_ORDERED_UNITS = exports2.ORDERED_UNITS.slice(0).reverse();
                exports2.HUMAN_ORDERED_UNITS = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"];
                exports2.PLURAL_MAPPING = {
                  year: "year",
                  years: "year",
                  quarter: "quarter",
                  quarters: "quarter",
                  month: "month",
                  months: "month",
                  day: "day",
                  days: "day",
                  hour: "hour",
                  hours: "hour",
                  localweeknumber: "localWeekNumber",
                  localweeknumbers: "localWeekNumber",
                  localweekday: "localWeekday",
                  localweekdays: "localWeekday",
                  localweekyear: "localWeekYear",
                  localweekyears: "localWeekYear",
                  minute: "minute",
                  minutes: "minute",
                  second: "second",
                  seconds: "second",
                  millisecond: "millisecond",
                  milliseconds: "millisecond",
                  weekday: "weekday",
                  weekdays: "weekday",
                  weeknumber: "weekNumber",
                  weeksnumber: "weekNumber",
                  weeknumbers: "weekNumber",
                  weekyear: "weekYear",
                  weekyears: "weekYear",
                  ordinal: "ordinal"
                };
                exports2.FALLBACK_WEEK_SETTINGS = {
                  firstDay: 1,
                  minimalDays: 4,
                  weekend: [6, 7]
                };
              }
            ),
            /***/
            "./src/impl/zoneUtil.ts": (
              /*!******************************!*\
                !*** ./src/impl/zoneUtil.ts ***!
                \******************************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.normalizeZone = void 0;
                var zone_1 = __webpack_require__2(
                  /*! ../zone */
                  "./src/zone.ts"
                );
                var IANAZone_1 = __webpack_require__2(
                  /*! ../zones/IANAZone */
                  "./src/zones/IANAZone.ts"
                );
                var fixedOffsetZone_1 = __webpack_require__2(
                  /*! ../zones/fixedOffsetZone */
                  "./src/zones/fixedOffsetZone.ts"
                );
                var util_1 = __webpack_require__2(
                  /*! ./util */
                  "./src/impl/util.ts"
                );
                var invalidZone_1 = __webpack_require__2(
                  /*! ../zones/invalidZone */
                  "./src/zones/invalidZone.ts"
                );
                var systemZone_1 = __webpack_require__2(
                  /*! ../zones/systemZone */
                  "./src/zones/systemZone.ts"
                );
                var normalizeZone = function(input, defaultZone) {
                  if ((0, util_1.isUndefined)(input) || input === null) {
                    return defaultZone;
                  } else if (input instanceof zone_1.Zone) {
                    return input;
                  } else if ((0, util_1.isString)(input)) {
                    var lowered = input.toLowerCase();
                    if (lowered === "default") {
                      return defaultZone;
                    } else if (lowered === "local" || lowered === "system") {
                      return systemZone_1.SystemZone.instance;
                    } else if (lowered === "utc" || lowered === "gmt") {
                      return fixedOffsetZone_1.FixedOffsetZone.utcInstance;
                    } else {
                      return fixedOffsetZone_1.FixedOffsetZone.parseSpecifier(lowered) || IANAZone_1.IANAZone.create(input);
                    }
                  } else if ((0, util_1.isNumber)(input)) {
                    return fixedOffsetZone_1.FixedOffsetZone.instance(input);
                  } else if (typeof input === "object" && "offset" in input && typeof input["offset"] === "function") {
                    return input;
                  } else {
                    return new invalidZone_1.InvalidZone(input);
                  }
                };
                exports2.normalizeZone = normalizeZone;
              }
            ),
            /***/
            "./src/index.ts": (
              /*!**********************!*\
                !*** ./src/index.ts ***!
                \**********************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.REVERSE_ORDERED_UNITS = exports2.ORDERED_UNITS = exports2.VERSION = exports2.Settings = exports2.SystemZone = exports2.InvalidZone = exports2.IANAZone = exports2.FixedOffsetZone = exports2.Zone = exports2.Info = exports2.Interval = exports2.Duration = exports2.DateTime = void 0;
                var tslib_1 = __webpack_require__2(
                  /*! tslib */
                  "./node_modules/tslib/tslib.es6.js"
                );
                var datetime_1 = __webpack_require__2(
                  /*! ./datetime */
                  "./src/datetime.ts"
                );
                Object.defineProperty(exports2, "DateTime", {
                  enumerable: true,
                  get: function() {
                    return datetime_1.DateTime;
                  }
                });
                var duration_1 = __webpack_require__2(
                  /*! ./duration */
                  "./src/duration.ts"
                );
                Object.defineProperty(exports2, "Duration", {
                  enumerable: true,
                  get: function() {
                    return duration_1.Duration;
                  }
                });
                var interval_1 = __webpack_require__2(
                  /*! ./interval */
                  "./src/interval.ts"
                );
                Object.defineProperty(exports2, "Interval", {
                  enumerable: true,
                  get: function() {
                    return interval_1.Interval;
                  }
                });
                var info_1 = __webpack_require__2(
                  /*! ./info */
                  "./src/info.ts"
                );
                Object.defineProperty(exports2, "Info", {
                  enumerable: true,
                  get: function() {
                    return info_1.Info;
                  }
                });
                var zone_1 = __webpack_require__2(
                  /*! ./zone */
                  "./src/zone.ts"
                );
                Object.defineProperty(exports2, "Zone", {
                  enumerable: true,
                  get: function() {
                    return zone_1.Zone;
                  }
                });
                var fixedOffsetZone_1 = __webpack_require__2(
                  /*! ./zones/fixedOffsetZone */
                  "./src/zones/fixedOffsetZone.ts"
                );
                Object.defineProperty(exports2, "FixedOffsetZone", {
                  enumerable: true,
                  get: function() {
                    return fixedOffsetZone_1.FixedOffsetZone;
                  }
                });
                var IANAZone_1 = __webpack_require__2(
                  /*! ./zones/IANAZone */
                  "./src/zones/IANAZone.ts"
                );
                Object.defineProperty(exports2, "IANAZone", {
                  enumerable: true,
                  get: function() {
                    return IANAZone_1.IANAZone;
                  }
                });
                var invalidZone_1 = __webpack_require__2(
                  /*! ./zones/invalidZone */
                  "./src/zones/invalidZone.ts"
                );
                Object.defineProperty(exports2, "InvalidZone", {
                  enumerable: true,
                  get: function() {
                    return invalidZone_1.InvalidZone;
                  }
                });
                var systemZone_1 = __webpack_require__2(
                  /*! ./zones/systemZone */
                  "./src/zones/systemZone.ts"
                );
                Object.defineProperty(exports2, "SystemZone", {
                  enumerable: true,
                  get: function() {
                    return systemZone_1.SystemZone;
                  }
                });
                var settings_1 = __webpack_require__2(
                  /*! ./settings */
                  "./src/settings.ts"
                );
                Object.defineProperty(exports2, "Settings", {
                  enumerable: true,
                  get: function() {
                    return settings_1.Settings;
                  }
                });
                var util_1 = __webpack_require__2(
                  /*! ./impl/util */
                  "./src/impl/util.ts"
                );
                Object.defineProperty(exports2, "ORDERED_UNITS", {
                  enumerable: true,
                  get: function() {
                    return util_1.ORDERED_UNITS;
                  }
                });
                Object.defineProperty(exports2, "REVERSE_ORDERED_UNITS", {
                  enumerable: true,
                  get: function() {
                    return util_1.REVERSE_ORDERED_UNITS;
                  }
                });
                tslib_1.__exportStar(__webpack_require__2(
                  /*! ./types/public */
                  "./src/types/public.ts"
                ), exports2);
                var VERSION = "5.0.6";
                exports2.VERSION = VERSION;
              }
            ),
            /***/
            "./src/info.ts": (
              /*!*********************!*\
                !*** ./src/info.ts ***!
                \*********************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.Info = void 0;
                var datetime_1 = __webpack_require__2(
                  /*! ./datetime */
                  "./src/datetime.ts"
                );
                var settings_1 = __webpack_require__2(
                  /*! ./settings */
                  "./src/settings.ts"
                );
                var locale_1 = __webpack_require__2(
                  /*! ./impl/locale */
                  "./src/impl/locale.ts"
                );
                var IANAZone_1 = __webpack_require__2(
                  /*! ./zones/IANAZone */
                  "./src/zones/IANAZone.ts"
                );
                var zoneUtil_1 = __webpack_require__2(
                  /*! ./impl/zoneUtil */
                  "./src/impl/zoneUtil.ts"
                );
                var util_1 = __webpack_require__2(
                  /*! ./impl/util */
                  "./src/impl/util.ts"
                );
                var Info2 = (
                  /** @class */
                  function() {
                    function Info3() {
                    }
                    Info3.eras = function(length, _a) {
                      if (length === void 0) {
                        length = "short";
                      }
                      var _b = _a === void 0 ? {} : _a, locale = _b.locale;
                      return locale_1.Locale.create(locale, void 0, "gregory").eras(length);
                    };
                    Info3.features = function() {
                      return {
                        relative: (0, util_1.hasRelative)(),
                        localeWeek: (0, util_1.hasLocaleWeekInfo)()
                      };
                    };
                    Info3.getMinimumDaysInFirstWeek = function(_a) {
                      var _b = _a === void 0 ? {} : _a, locale = _b.locale, locObj = _b.locObj;
                      return (locObj || locale_1.Locale.create(locale)).getMinDaysInFirstWeek();
                    };
                    Info3.getStartOfWeek = function(_a) {
                      var _b = _a === void 0 ? {} : _a, locale = _b.locale, locObj = _b.locObj;
                      return (locObj || locale_1.Locale.create(locale)).getStartOfWeek();
                    };
                    Info3.getWeekendWeekdays = function(_a) {
                      var _b = _a === void 0 ? {} : _a, locale = _b.locale, locObj = _b.locObj;
                      return (locObj || locale_1.Locale.create(locale)).getWeekendDays().slice();
                    };
                    Info3.hasDST = function(zone) {
                      if (zone === void 0) {
                        zone = settings_1.Settings.defaultZone;
                      }
                      var proto = datetime_1.DateTime.now().setZone(zone).set({
                        month: 12
                      });
                      return !zone.isUniversal && proto.offset !== proto.set({
                        month: 6
                      }).offset;
                    };
                    Info3.isValidIANAZone = function(zone) {
                      return IANAZone_1.IANAZone.isValidZone(zone);
                    };
                    Info3.meridiems = function(_a) {
                      var _b = _a === void 0 ? {} : _a, locale = _b.locale;
                      return locale_1.Locale.create(locale).meridiems();
                    };
                    Info3.months = function(length, _a) {
                      if (length === void 0) {
                        length = "long";
                      }
                      var _b = _a === void 0 ? {} : _a, _c = _b.locale, locale = _c === void 0 ? null : _c, _d = _b.locObj, locObj = _d === void 0 ? null : _d, _e = _b.numberingSystem, numberingSystem = _e === void 0 ? null : _e, _f = _b.outputCalendar, outputCalendar = _f === void 0 ? "gregory" : _f;
                      return (locObj || locale_1.Locale.create(locale, numberingSystem, outputCalendar)).months(length);
                    };
                    Info3.monthsFormat = function(length, _a) {
                      if (length === void 0) {
                        length = "long";
                      }
                      var _b = _a === void 0 ? {} : _a, locale = _b.locale, locObj = _b.locObj, numberingSystem = _b.numberingSystem, _c = _b.outputCalendar, outputCalendar = _c === void 0 ? "gregory" : _c;
                      return (locObj || locale_1.Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
                    };
                    Info3.normalizeZone = function(input) {
                      return (0, zoneUtil_1.normalizeZone)(input, settings_1.Settings.defaultZone);
                    };
                    Info3.weekdays = function(length, _a) {
                      if (length === void 0) {
                        length = "long";
                      }
                      var _b = _a === void 0 ? {} : _a, locale = _b.locale, locObj = _b.locObj, numberingSystem = _b.numberingSystem;
                      return (locObj || locale_1.Locale.create(locale, numberingSystem)).weekdays(length);
                    };
                    Info3.weekdaysFormat = function(length, _a) {
                      if (length === void 0) {
                        length = "long";
                      }
                      var _b = _a === void 0 ? {} : _a, locale = _b.locale, locObj = _b.locObj, numberingSystem = _b.numberingSystem;
                      return (locObj || locale_1.Locale.create(locale, numberingSystem)).weekdays(length, true);
                    };
                    return Info3;
                  }()
                );
                exports2.Info = Info2;
              }
            ),
            /***/
            "./src/interval.ts": (
              /*!*************************!*\
                !*** ./src/interval.ts ***!
                \*************************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.Interval = void 0;
                var datetime_1 = __webpack_require__2(
                  /*! ./datetime */
                  "./src/datetime.ts"
                );
                var duration_1 = __webpack_require__2(
                  /*! ./duration */
                  "./src/duration.ts"
                );
                var errors_1 = __webpack_require__2(
                  /*! ./errors */
                  "./src/errors.ts"
                );
                var invalid_1 = __webpack_require__2(
                  /*! ./types/invalid */
                  "./src/types/invalid.ts"
                );
                var settings_1 = __webpack_require__2(
                  /*! ./settings */
                  "./src/settings.ts"
                );
                var util_1 = __webpack_require__2(
                  /*! ./impl/util */
                  "./src/impl/util.ts"
                );
                var formatter_1 = __webpack_require__2(
                  /*! ./impl/formatter */
                  "./src/impl/formatter.ts"
                );
                var formats_1 = __webpack_require__2(
                  /*! ./impl/formats */
                  "./src/impl/formats.ts"
                );
                var INVALID = "Invalid Interval";
                function validateStartEnd(start, end) {
                  if (!start || !start.isValid) {
                    return Interval.invalid("missing or invalid start");
                  } else if (!end || !end.isValid) {
                    return Interval.invalid("missing or invalid end");
                  } else if (end < start) {
                    return Interval.invalid("end before start", "The end of an interval must be after its start, but you had start=".concat(start.toISO(), " and end=").concat(end.toISO()));
                  }
                }
                function friendlyDateTime(dateTimeish) {
                  if (datetime_1.DateTime.isDateTime(dateTimeish)) {
                    return dateTimeish;
                  } else if (dateTimeish && dateTimeish.valueOf && (0, util_1.isNumber)(dateTimeish.valueOf())) {
                    return datetime_1.DateTime.fromJSDate(dateTimeish);
                  } else if (dateTimeish && typeof dateTimeish === "object") {
                    return datetime_1.DateTime.fromObject(dateTimeish);
                  } else {
                    throw new errors_1.InvalidArgumentError("Unknown datetime argument: ".concat(dateTimeish, ", of type ").concat(typeof dateTimeish));
                  }
                }
                var Interval = (
                  /** @class */
                  function() {
                    function Interval2(config2) {
                      this._s = config2.start;
                      this._e = config2.end;
                      this._invalid = config2.invalid || null;
                      this._isLuxonInterval = true;
                    }
                    Object.defineProperty(Interval2.prototype, "end", {
                      /**
                       * Returns the end of the Interval
                       */
                      get: function() {
                        return this.isValid ? this._e : null;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Interval2.prototype, "invalidReason", {
                      /**
                       * Returns an error code if this Interval is invalid, or null if the Interval is valid
                       */
                      get: function() {
                        return this._invalid ? this._invalid.reason : null;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Interval2.prototype, "isValid", {
                      /**
                       * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
                       */
                      get: function() {
                        return this.invalidReason === null;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Interval2.prototype, "start", {
                      /**
                       * Returns the start of the Interval
                       */
                      get: function() {
                        return this.isValid ? this._s : null;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Interval2.after = function(start, duration) {
                      var dur = duration_1.Duration.fromDurationLike(duration), dt = friendlyDateTime(start);
                      return new Interval2({
                        start: dt,
                        end: dt ? dt.plus(dur) : void 0
                      });
                    };
                    Interval2.before = function(end, duration) {
                      var dur = duration_1.Duration.fromDurationLike(duration), dt = friendlyDateTime(end);
                      return new Interval2({
                        start: dt ? dt.minus(dur) : void 0,
                        end: dt
                      });
                    };
                    Interval2.fromDateTimes = function(start, end) {
                      var builtStart = friendlyDateTime(start), builtEnd = friendlyDateTime(end);
                      var validateError = validateStartEnd(builtStart, builtEnd);
                      return validateError || new Interval2({
                        start: builtStart,
                        end: builtEnd
                      });
                    };
                    Interval2.fromISO = function(text, opts) {
                      if (opts === void 0) {
                        opts = {};
                      }
                      var _a = (text || "").split("/", 2), s = _a[0], e = _a[1];
                      if (s && e) {
                        var start = void 0, startIsValid = void 0;
                        try {
                          start = datetime_1.DateTime.fromISO(s, opts);
                          startIsValid = start.isValid;
                        } catch (e2) {
                          startIsValid = false;
                        }
                        var end = void 0, endIsValid = void 0;
                        try {
                          end = datetime_1.DateTime.fromISO(e, opts);
                          endIsValid = end.isValid;
                        } catch (e2) {
                          endIsValid = false;
                        }
                        if (startIsValid && endIsValid) {
                          return Interval2.fromDateTimes(start, end);
                        }
                        if (startIsValid) {
                          var dur = duration_1.Duration.fromISO(e, opts);
                          if (dur.isValid) {
                            return Interval2.after(start, dur);
                          }
                        } else if (endIsValid) {
                          var dur = duration_1.Duration.fromISO(s, opts);
                          if (dur.isValid) {
                            return Interval2.before(end, dur);
                          }
                        }
                      }
                      return Interval2.invalid("unparsable", 'the input "'.concat(text, `" can't be parsed as ISO 8601`));
                    };
                    Interval2.invalid = function(reason, explanation) {
                      if (!reason) {
                        throw new errors_1.InvalidArgumentError("need to specify a reason the Interval is invalid");
                      }
                      var invalid = reason instanceof invalid_1.Invalid ? reason : new invalid_1.Invalid(reason, explanation);
                      if (settings_1.Settings.throwOnInvalid) {
                        throw new errors_1.InvalidIntervalError(invalid);
                      } else {
                        return new Interval2({
                          invalid
                        });
                      }
                    };
                    Interval2.isInterval = function(o) {
                      return !!o && o._isLuxonInterval || false;
                    };
                    Interval2.merge = function(intervals) {
                      var _a = intervals.sort(function(a, b) {
                        return a._s.valueOf() - b._s.valueOf();
                      }).reduce(function(_a2, item) {
                        var sofar = _a2[0], current = _a2[1];
                        if (!current) {
                          return [sofar, item];
                        } else if (current.overlaps(item) || current.abutsStart(item)) {
                          return [sofar, current.union(item)];
                        } else {
                          return [sofar.concat([current]), item];
                        }
                      }, [[], null]), found = _a[0], final = _a[1];
                      if (final) {
                        found.push(final);
                      }
                      return found;
                    };
                    Interval2.xor = function(intervals) {
                      var _a;
                      var start = null, currentCount = 0;
                      var results = [], ends = intervals.map(function(i2) {
                        return [{
                          time: i2._s,
                          type: "s"
                        }, {
                          time: i2._e,
                          type: "e"
                        }];
                      }), flattened = (_a = Array.prototype).concat.apply(_a, ends), arr = flattened.sort(function(a, b) {
                        return +a.time - +b.time;
                      });
                      for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                        var i = arr_1[_i];
                        currentCount += i.type === "s" ? 1 : -1;
                        if (currentCount === 1) {
                          start = i.time;
                        } else {
                          if (start && start.valueOf() !== i.time.valueOf()) {
                            results.push(Interval2.fromDateTimes(start, i.time));
                          }
                          start = null;
                        }
                      }
                      return Interval2.merge(results);
                    };
                    Interval2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
                      if (this.isValid) {
                        return "Interval { start: ".concat(this._s.toISO(), ", end: ").concat(this._e.toISO(), " }");
                      } else {
                        return "Interval { Invalid, reason: ".concat(this.invalidReason, " }");
                      }
                    };
                    Interval2.prototype.abutsEnd = function(other) {
                      return +other._e === +this._s;
                    };
                    Interval2.prototype.abutsStart = function(other) {
                      return +this._e === +other._s;
                    };
                    Interval2.prototype.contains = function(dateTime) {
                      return this._s <= dateTime && this._e > dateTime;
                    };
                    Interval2.prototype.count = function(unit, opts) {
                      if (unit === void 0) {
                        unit = "milliseconds";
                      }
                      if (!this.isValid) {
                        return NaN;
                      }
                      var start = this.start.startOf(unit, opts);
                      var end;
                      if (opts === null || opts === void 0 ? void 0 : opts.useLocaleWeeks) {
                        end = this.end.reconfigure({
                          locale: start.locale
                        });
                      } else {
                        end = this.end;
                      }
                      end = end.startOf(unit, opts);
                      return Math.floor(end.diff(start, unit).get(unit)) + +(end.valueOf() !== this.end.valueOf());
                    };
                    Interval2.prototype.difference = function() {
                      var _this = this;
                      var intervals = [];
                      for (var _i = 0; _i < arguments.length; _i++) {
                        intervals[_i] = arguments[_i];
                      }
                      return Interval2.xor([this].concat(intervals)).map(function(i) {
                        return _this.intersection(i);
                      }).filter(function(i) {
                        return i && !i.isEmpty();
                      });
                    };
                    Interval2.prototype.divideEqually = function(numberOfParts) {
                      if (!this.isValid) {
                        return [];
                      }
                      return this.splitBy({
                        milliseconds: this.length() / numberOfParts
                      }).slice(0, numberOfParts);
                    };
                    Interval2.prototype.engulfs = function(other) {
                      if (!this.isValid) {
                        return false;
                      }
                      return this._s <= other._s && this._e >= other._e;
                    };
                    Interval2.prototype.equals = function(other) {
                      if (!this.isValid || !other.isValid) {
                        return false;
                      }
                      return this._s.equals(other._s) && this._e.equals(other._e);
                    };
                    Interval2.prototype.hasSame = function(unit) {
                      return this.isValid ? this.isEmpty() || this._e.minus(1).hasSame(this._s, unit) : false;
                    };
                    Interval2.prototype.intersection = function(other) {
                      if (!this.isValid) {
                        return this;
                      }
                      var s = this._s > other._s ? this._s : other._s, e = this._e < other._e ? this._e : other._e;
                      if (s >= e) {
                        return null;
                      } else {
                        return Interval2.fromDateTimes(s, e);
                      }
                    };
                    Interval2.prototype.isAfter = function(dateTime) {
                      if (!this.isValid) {
                        return false;
                      }
                      return this._s > dateTime;
                    };
                    Interval2.prototype.isBefore = function(dateTime) {
                      if (!this.isValid) {
                        return false;
                      }
                      return this._e <= dateTime;
                    };
                    Interval2.prototype.isEmpty = function() {
                      return this._s.valueOf() === this._e.valueOf();
                    };
                    Interval2.prototype.length = function(unit) {
                      if (unit === void 0) {
                        unit = "milliseconds";
                      }
                      return this.toDuration(unit).get(unit);
                    };
                    Interval2.prototype.mapEndpoints = function(mapFn) {
                      return Interval2.fromDateTimes(mapFn(this._s), mapFn(this._e));
                    };
                    Interval2.prototype.overlaps = function(other) {
                      return this._e > other._s && this._s < other._e;
                    };
                    Interval2.prototype.set = function(_a) {
                      var _b = _a === void 0 ? {} : _a, start = _b.start, end = _b.end;
                      if (!this.isValid) {
                        return this;
                      }
                      return Interval2.fromDateTimes(start || this._s, end || this._e);
                    };
                    Interval2.prototype.splitAt = function() {
                      var _this = this;
                      var dateTimes = [];
                      for (var _i = 0; _i < arguments.length; _i++) {
                        dateTimes[_i] = arguments[_i];
                      }
                      var sorted = dateTimes.map(friendlyDateTime).filter(function(d) {
                        return _this.contains(d);
                      }).sort(function(a, b) {
                        return a.toMillis() - b.toMillis();
                      });
                      var results = [];
                      var s = this._s, i = 0;
                      while (s < this._e) {
                        var added = sorted[i] || this._e;
                        var next = +added > +this._e ? this._e : added;
                        results.push(Interval2.fromDateTimes(s, next));
                        s = next;
                        i += 1;
                      }
                      return results;
                    };
                    Interval2.prototype.splitBy = function(duration) {
                      var dur = duration_1.Duration.fromDurationLike(duration);
                      if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
                        return [];
                      }
                      var s = this._s, idx = 1, next;
                      var results = [];
                      while (s < this._e) {
                        var added = this.start.plus(dur.mapUnits(function(x) {
                          return x * idx;
                        }));
                        next = +added > +this._e ? this._e : added;
                        results.push(Interval2.fromDateTimes(s, next));
                        s = next;
                        idx += 1;
                      }
                      return results;
                    };
                    Interval2.prototype.toDuration = function(unit, opts) {
                      if (unit === void 0) {
                        unit = "milliseconds";
                      }
                      if (opts === void 0) {
                        opts = {};
                      }
                      if (!this.isValid) {
                        return duration_1.Duration.invalid(this._invalid.reason);
                      }
                      return this._e.diff(this._s, unit, opts);
                    };
                    Interval2.prototype.toFormat = function(dateFormat, _a) {
                      var _b = _a === void 0 ? {} : _a, _c = _b.separator, separator = _c === void 0 ? " - " : _c;
                      if (!this.isValid) {
                        return INVALID;
                      }
                      return "".concat(this._s.toFormat(dateFormat)).concat(separator).concat(this._e.toFormat(dateFormat));
                    };
                    Interval2.prototype.toISO = function(options) {
                      if (options === void 0) {
                        options = {};
                      }
                      if (!this.isValid) {
                        return INVALID;
                      }
                      return "".concat(this._s.toISO(options), "/").concat(this._e.toISO(options));
                    };
                    Interval2.prototype.toISODate = function() {
                      if (!this.isValid) {
                        return INVALID;
                      }
                      return "".concat(this._s.toISODate(), "/").concat(this._e.toISODate());
                    };
                    Interval2.prototype.toISOTime = function(options) {
                      if (options === void 0) {
                        options = {};
                      }
                      if (!this.isValid) {
                        return INVALID;
                      }
                      return "".concat(this._s.toISOTime(options), "/").concat(this._e.toISOTime(options));
                    };
                    Interval2.prototype.toLocaleString = function(formatOpts, opts) {
                      if (formatOpts === void 0) {
                        formatOpts = formats_1.DATE_SHORT;
                      }
                      if (opts === void 0) {
                        opts = {};
                      }
                      return this.isValid ? formatter_1.Formatter.create(this._s.loc.clone(opts), formatOpts).formatInterval(this) : INVALID;
                    };
                    Interval2.prototype.toString = function() {
                      if (!this.isValid) {
                        return INVALID;
                      }
                      return "[".concat(this._s.toISO(), " – ").concat(this._e.toISO(), ")");
                    };
                    Interval2.prototype.union = function(other) {
                      if (!this.isValid) {
                        return this;
                      }
                      var s = this._s < other._s ? this._s : other._s, e = this._e > other._e ? this._e : other._e;
                      return Interval2.fromDateTimes(s, e);
                    };
                    return Interval2;
                  }()
                );
                exports2.Interval = Interval;
              }
            ),
            /***/
            "./src/settings.ts": (
              /*!*************************!*\
                !*** ./src/settings.ts ***!
                \*************************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.Settings = void 0;
                var IANAZone_1 = __webpack_require__2(
                  /*! ./zones/IANAZone */
                  "./src/zones/IANAZone.ts"
                );
                var locale_1 = __webpack_require__2(
                  /*! ./impl/locale */
                  "./src/impl/locale.ts"
                );
                var zoneUtil_1 = __webpack_require__2(
                  /*! ./impl/zoneUtil */
                  "./src/impl/zoneUtil.ts"
                );
                var systemZone_1 = __webpack_require__2(
                  /*! ./zones/systemZone */
                  "./src/zones/systemZone.ts"
                );
                var util_1 = __webpack_require__2(
                  /*! ./impl/util */
                  "./src/impl/util.ts"
                );
                var datetime_1 = __webpack_require__2(
                  /*! ./datetime */
                  "./src/datetime.ts"
                );
                var digits_1 = __webpack_require__2(
                  /*! ./impl/digits */
                  "./src/impl/digits.ts"
                );
                var now = function() {
                  return Date.now();
                }, defaultZone = "system", defaultLocale, defaultNumberingSystem, defaultOutputCalendar, twoDigitCutoffYear = 60, throwOnInvalid = false, defaultWeekSettings;
                var Settings = (
                  /** @class */
                  function() {
                    function Settings2() {
                    }
                    Object.defineProperty(Settings2, "defaultLocale", {
                      /**
                       * Get the default locale to create DateTimes with. Does not affect existing instances.
                       */
                      get: function() {
                        return defaultLocale;
                      },
                      /**
                       * Set the default locale to create DateTimes with. Does not affect existing instances.
                       */
                      set: function(locale) {
                        defaultLocale = locale;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Settings2, "defaultNumberingSystem", {
                      /**
                       * Get the default numbering system to create DateTimes with. Does not affect existing instances.
                       */
                      get: function() {
                        return defaultNumberingSystem;
                      },
                      /**
                       * Set the default numbering system to create DateTimes with. Does not affect existing instances.
                       * @type {string}
                       */
                      set: function(numberingSystem) {
                        defaultNumberingSystem = numberingSystem;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Settings2, "defaultOutputCalendar", {
                      /**
                       * Get the default output calendar to create DateTimes with. Does not affect existing instances.
                       */
                      get: function() {
                        return defaultOutputCalendar;
                      },
                      /**
                       * Set the default output calendar to create DateTimes with. Does not affect existing instances.
                       */
                      set: function(outputCalendar) {
                        defaultOutputCalendar = outputCalendar;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Settings2, "defaultWeekSettings", {
                      get: function() {
                        return defaultWeekSettings;
                      },
                      /**
                       * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
                       * how many days are required in the first week of a year.
                       * Does not affect existing instances.
                       */
                      set: function(weekSettings) {
                        defaultWeekSettings = (0, util_1.validateWeekSettings)(weekSettings);
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Settings2, "defaultZone", {
                      /**
                       * Get the default time zone object to create DateTimes in. Does not affect existing instances.
                       */
                      get: function() {
                        return (0, zoneUtil_1.normalizeZone)(defaultZone, systemZone_1.SystemZone.instance);
                      },
                      /**
                       * [TS] had to use type Zone here. I created another setter to use a ZoneLike instead
                       * Let's face it. This is ugly. The original should have this approach as well.
                       * Set the default time zone to create DateTimes in. Does not affect existing instances.
                       * Use the value "system" to reset this value to the system's time zone.
                       */
                      set: function(zone) {
                        defaultZone = zone;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Settings2, "defaultZoneLike", {
                      /**
                       * [TS] can't use the real setter here because set and get must have the same type.
                       * Let's face this. This is bullshit. But I get that you want to make life easier for users.
                       * Set the default time zone to create DateTimes in. Does not affect existing instances.
                       * Use the value "system" to reset this value to the system's time zone.
                       */
                      set: function(zone) {
                        defaultZone = zone;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Settings2, "now", {
                      /**
                       * Get the callback for returning the current timestamp.
                       */
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      get: function() {
                        return now;
                      },
                      /**
                       * Set the callback for returning the current timestamp.
                       * The function should return a number, which will be interpreted as an Epoch millisecond count
                       * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
                       * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
                       */
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      set: function(n) {
                        now = n;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Settings2, "throwOnInvalid", {
                      /**
                       * Get whether TSLuxon will throw when it encounters invalid DateTimes, Durations, or Intervals
                       */
                      get: function() {
                        return throwOnInvalid;
                      },
                      /**
                       * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
                       * @type {boolean}
                       */
                      set: function(t) {
                        throwOnInvalid = t;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Settings2, "twoDigitCutoffYear", {
                      /**
                       * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
                       * @type {number}
                       */
                      get: function() {
                        return twoDigitCutoffYear;
                      },
                      /**
                       * Set the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
                       * @type {number}
                       * @example Settings.twoDigitCutoffYear = 0 // all 'yy' are interpreted as 20th century
                       * @example Settings.twoDigitCutoffYear = 99 // all 'yy' are interpreted as 21st century
                       * @example Settings.twoDigitCutoffYear = 50 // '49' -> 2049; '50' -> 1950
                       * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
                       * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
                       */
                      set: function(cutoffYear) {
                        twoDigitCutoffYear = cutoffYear % 100;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Settings2.resetCaches = function() {
                      locale_1.Locale.resetCache();
                      IANAZone_1.IANAZone.resetCache();
                      datetime_1.DateTime.resetCache();
                      (0, digits_1.resetDigitRegexCache)();
                    };
                    return Settings2;
                  }()
                );
                exports2.Settings = Settings;
              }
            ),
            /***/
            "./src/types/common.ts": (
              /*!*****************************!*\
                !*** ./src/types/common.ts ***!
                \*****************************/
              /***/
              (__unused_webpack_module, exports2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
              }
            ),
            /***/
            "./src/types/datetime.ts": (
              /*!*******************************!*\
                !*** ./src/types/datetime.ts ***!
                \*******************************/
              /***/
              (__unused_webpack_module, exports2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
              }
            ),
            /***/
            "./src/types/duration.ts": (
              /*!*******************************!*\
                !*** ./src/types/duration.ts ***!
                \*******************************/
              /***/
              (__unused_webpack_module, exports2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
              }
            ),
            /***/
            "./src/types/info.ts": (
              /*!***************************!*\
                !*** ./src/types/info.ts ***!
                \***************************/
              /***/
              (__unused_webpack_module, exports2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
              }
            ),
            /***/
            "./src/types/interval.ts": (
              /*!*******************************!*\
                !*** ./src/types/interval.ts ***!
                \*******************************/
              /***/
              (__unused_webpack_module, exports2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
              }
            ),
            /***/
            "./src/types/intl-next.ts": (
              /*!********************************!*\
                !*** ./src/types/intl-next.ts ***!
                \********************************/
              /***/
              (__unused_webpack_module, exports2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2["default"] = Intl;
              }
            ),
            /***/
            "./src/types/invalid.ts": (
              /*!******************************!*\
                !*** ./src/types/invalid.ts ***!
                \******************************/
              /***/
              (__unused_webpack_module, exports2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.Invalid = void 0;
                var Invalid = (
                  /** @class */
                  function() {
                    function Invalid2(reason, explanation) {
                      this.reason = reason;
                      this.explanation = explanation;
                      this._formattedExplanation = "";
                      explanation && (this._formattedExplanation = ": ".concat(explanation));
                    }
                    Invalid2.prototype.toMessage = function() {
                      return "".concat(this.reason).concat(this._formattedExplanation);
                    };
                    return Invalid2;
                  }()
                );
                exports2.Invalid = Invalid;
              }
            ),
            /***/
            "./src/types/locale.ts": (
              /*!*****************************!*\
                !*** ./src/types/locale.ts ***!
                \*****************************/
              /***/
              (__unused_webpack_module, exports2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
              }
            ),
            /***/
            "./src/types/public.ts": (
              /*!*****************************!*\
                !*** ./src/types/public.ts ***!
                \*****************************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.Intl = void 0;
                var tslib_1 = __webpack_require__2(
                  /*! tslib */
                  "./node_modules/tslib/tslib.es6.js"
                );
                tslib_1.__exportStar(__webpack_require__2(
                  /*! ./common */
                  "./src/types/common.ts"
                ), exports2);
                tslib_1.__exportStar(__webpack_require__2(
                  /*! ./datetime */
                  "./src/types/datetime.ts"
                ), exports2);
                tslib_1.__exportStar(__webpack_require__2(
                  /*! ./duration */
                  "./src/types/duration.ts"
                ), exports2);
                tslib_1.__exportStar(__webpack_require__2(
                  /*! ./info */
                  "./src/types/info.ts"
                ), exports2);
                tslib_1.__exportStar(__webpack_require__2(
                  /*! ./interval */
                  "./src/types/interval.ts"
                ), exports2);
                tslib_1.__exportStar(__webpack_require__2(
                  /*! ./locale */
                  "./src/types/locale.ts"
                ), exports2);
                tslib_1.__exportStar(__webpack_require__2(
                  /*! ./zone */
                  "./src/types/zone.ts"
                ), exports2);
                var intl_next_1 = tslib_1.__importDefault(__webpack_require__2(
                  /*! ./intl-next */
                  "./src/types/intl-next.ts"
                ));
                exports2.Intl = intl_next_1.default;
              }
            ),
            /***/
            "./src/types/zone.ts": (
              /*!***************************!*\
                !*** ./src/types/zone.ts ***!
                \***************************/
              /***/
              (__unused_webpack_module, exports2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
              }
            ),
            /***/
            "./src/zone.ts": (
              /*!*********************!*\
                !*** ./src/zone.ts ***!
                \*********************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.Zone = void 0;
                var errors_1 = __webpack_require__2(
                  /*! ./errors */
                  "./src/errors.ts"
                );
                function silenceUnusedWarning() {
                  var args = [];
                  for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                  }
                  args.length;
                }
                var Zone = (
                  /** @class */
                  function() {
                    function Zone2() {
                    }
                    Object.defineProperty(Zone2.prototype, "type", {
                      /**
                       * The type of zone
                       * @abstract
                       * @type {string}
                       */
                      get: function() {
                        throw new errors_1.ZoneIsAbstractError();
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Zone2.prototype, "ianaName", {
                      /**
                       * The IANA name of this zone.
                       * Defaults to `name` if not overwritten by a subclass.
                       * @abstract
                       * @type {string}
                       */
                      get: function() {
                        return this.name;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Zone2.prototype, "name", {
                      /**
                       * The name of this zone.
                       * @abstract
                       * @type {string}
                       */
                      get: function() {
                        throw new errors_1.ZoneIsAbstractError();
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Zone2.prototype, "isUniversal", {
                      /**
                       * Returns whether the offset is known to be fixed for the whole year.
                       * @abstract
                       * @type {boolean}
                       */
                      get: function() {
                        throw new errors_1.ZoneIsAbstractError();
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Zone2.prototype.offsetName = function(ts, options) {
                      silenceUnusedWarning(ts, options);
                      throw new errors_1.ZoneIsAbstractError();
                    };
                    Zone2.prototype.formatOffset = function(ts, format) {
                      silenceUnusedWarning(ts, format);
                      throw new errors_1.ZoneIsAbstractError();
                    };
                    Zone2.prototype.offset = function(ts) {
                      silenceUnusedWarning(ts);
                      throw new errors_1.ZoneIsAbstractError();
                    };
                    Zone2.prototype.equals = function(other) {
                      silenceUnusedWarning(other);
                      throw new errors_1.ZoneIsAbstractError();
                    };
                    Object.defineProperty(Zone2.prototype, "isValid", {
                      /**
                       * Return whether this Zone is valid.
                       * @abstract
                       * @type {boolean}
                       */
                      get: function() {
                        throw new errors_1.ZoneIsAbstractError();
                      },
                      enumerable: false,
                      configurable: true
                    });
                    return Zone2;
                  }()
                );
                exports2.Zone = Zone;
              }
            ),
            /***/
            "./src/zones/IANAZone.ts": (
              /*!*******************************!*\
                !*** ./src/zones/IANAZone.ts ***!
                \*******************************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.IANAZone = void 0;
                var tslib_1 = __webpack_require__2(
                  /*! tslib */
                  "./node_modules/tslib/tslib.es6.js"
                );
                var util_1 = __webpack_require__2(
                  /*! ../impl/util */
                  "./src/impl/util.ts"
                );
                var zone_1 = __webpack_require__2(
                  /*! ../zone */
                  "./src/zone.ts"
                );
                var errors_1 = __webpack_require__2(
                  /*! ../errors */
                  "./src/errors.ts"
                );
                var intl_next_1 = tslib_1.__importDefault(__webpack_require__2(
                  /*! ../types/intl-next */
                  "./src/types/intl-next.ts"
                ));
                var dtfCache = {};
                function makeDTF(zone) {
                  if (!dtfCache[zone]) {
                    try {
                      dtfCache[zone] = new intl_next_1.default.DateTimeFormat("en-US", {
                        hour12: false,
                        timeZone: zone,
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        era: "short"
                      });
                    } catch (_a) {
                      throw new errors_1.InvalidZoneError(zone);
                    }
                  }
                  return dtfCache[zone];
                }
                var typeToPos = {
                  year: 0,
                  month: 1,
                  day: 2,
                  era: 3,
                  hour: 4,
                  minute: 5,
                  second: 6
                };
                function hackyOffset(dtf, date) {
                  var formatted = dtf.format(date).replace(/\u200E/g, "");
                  var parsed = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(formatted);
                  var fMonth = parsed[1], fDay = parsed[2], fYear = parsed[3], fadOrBc = parsed[4], fHour = parsed[5], fMinute = parsed[6], fSecond = parsed[7];
                  return [fYear, fMonth, fDay, fadOrBc, fHour, fMinute, fSecond];
                }
                function partsOffset(dtf, date) {
                  var formatted = dtf.formatToParts(date);
                  var filled = [];
                  for (var i = 0; i < formatted.length; i++) {
                    var _a = formatted[i], type = _a.type, value = _a.value;
                    var pos = typeToPos[type];
                    if (type === "era") {
                      filled[pos] = value;
                    } else if (!(0, util_1.isUndefined)(pos)) {
                      filled[pos] = parseInt(value, 10);
                    }
                  }
                  return filled;
                }
                var ianaZoneCache = {};
                var IANAZone = (
                  /** @class */
                  function(_super) {
                    tslib_1.__extends(IANAZone2, _super);
                    function IANAZone2(name) {
                      var _this = _super.call(this) || this;
                      _this._zoneName = name;
                      _this._valid = IANAZone2.isValidZone(name);
                      return _this;
                    }
                    IANAZone2.create = function(name) {
                      if (!ianaZoneCache[name]) {
                        ianaZoneCache[name] = new IANAZone2(name);
                      }
                      return ianaZoneCache[name];
                    };
                    IANAZone2.resetCache = function() {
                      ianaZoneCache = {};
                      dtfCache = {};
                    };
                    IANAZone2.isValidSpecifier = function(s) {
                      return this.isValidZone(s);
                    };
                    IANAZone2.isValidZone = function(zone) {
                      if (!zone) {
                        return false;
                      }
                      try {
                        new intl_next_1.default.DateTimeFormat("en-US", {
                          timeZone: zone
                        }).format();
                        return true;
                      } catch (e) {
                        return false;
                      }
                    };
                    Object.defineProperty(IANAZone2.prototype, "type", {
                      /** @override **/
                      get: function() {
                        return "iana";
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(IANAZone2.prototype, "name", {
                      /** @override **/
                      get: function() {
                        return this._zoneName;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(IANAZone2.prototype, "isUniversal", {
                      /** @override **/
                      get: function() {
                        return false;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    IANAZone2.prototype.offsetName = function(ts, _a) {
                      var _b = _a === void 0 ? {} : _a, format = _b.format, locale = _b.locale;
                      return (0, util_1.parseZoneInfo)(ts, format, locale, this.name);
                    };
                    IANAZone2.prototype.formatOffset = function(ts, format) {
                      return (0, util_1.formatOffset)(this.offset(ts), format);
                    };
                    IANAZone2.prototype.offset = function(ts) {
                      var date = new Date(ts);
                      if (isNaN(+date)) {
                        return NaN;
                      }
                      var dtf = makeDTF(this.name);
                      var yearAlt;
                      var _a = typeof dtf.formatToParts === typeof isNaN ? partsOffset(dtf, date) : hackyOffset(dtf, date), year = _a[0], month = _a[1], day = _a[2], adOrBc = _a[3], hour = _a[4], minute = _a[5], second = _a[6];
                      if (adOrBc === "BC") {
                        yearAlt = -Math.abs(+year) + 1;
                      }
                      var adjustedHour = hour === 24 ? 0 : hour;
                      var asUTC = (0, util_1.objToLocalTS)({
                        year: yearAlt || +year,
                        month: +month,
                        day: +day,
                        hour: +adjustedHour,
                        minute: +minute,
                        second: +second,
                        millisecond: 0
                      });
                      var asTS = +date;
                      var over = asTS % 1e3;
                      asTS -= over >= 0 ? over : 1e3 + over;
                      return (asUTC - asTS) / (60 * 1e3);
                    };
                    IANAZone2.prototype.equals = function(other) {
                      return other.type === "iana" && other.name === this.name;
                    };
                    Object.defineProperty(IANAZone2.prototype, "isValid", {
                      /** @override **/
                      get: function() {
                        return this._valid;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    return IANAZone2;
                  }(zone_1.Zone)
                );
                exports2.IANAZone = IANAZone;
              }
            ),
            /***/
            "./src/zones/fixedOffsetZone.ts": (
              /*!**************************************!*\
                !*** ./src/zones/fixedOffsetZone.ts ***!
                \**************************************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.FixedOffsetZone = void 0;
                var tslib_1 = __webpack_require__2(
                  /*! tslib */
                  "./node_modules/tslib/tslib.es6.js"
                );
                var util_1 = __webpack_require__2(
                  /*! ../impl/util */
                  "./src/impl/util.ts"
                );
                var zone_1 = __webpack_require__2(
                  /*! ../zone */
                  "./src/zone.ts"
                );
                var singleton = null;
                var FixedOffsetZone = (
                  /** @class */
                  function(_super) {
                    tslib_1.__extends(FixedOffsetZone2, _super);
                    function FixedOffsetZone2(offset) {
                      var _this = _super.call(this) || this;
                      _this._fixed = offset;
                      return _this;
                    }
                    Object.defineProperty(FixedOffsetZone2, "utcInstance", {
                      /**
                       * Get a singleton instance of UTC
                       * @return {FixedOffsetZone}
                       */
                      get: function() {
                        if (singleton === null) {
                          singleton = new FixedOffsetZone2(0);
                        }
                        return singleton;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(FixedOffsetZone2.prototype, "ianaName", {
                      /**
                       * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
                       *
                       * @override
                       * @type {string}
                       */
                      get: function() {
                        return this._fixed === 0 ? "Etc/UTC" : "Etc/GMT".concat((0, util_1.formatOffset)(-this._fixed, "narrow"));
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(FixedOffsetZone2.prototype, "isUniversal", {
                      /**
                       * Returns whether the offset is known to be fixed for the whole year:
                       * Always returns true for all fixed offset zones.
                       * @override
                       * @type {boolean}
                       */
                      get: function() {
                        return true;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(FixedOffsetZone2.prototype, "isValid", {
                      /**
                       * Return whether this Zone is valid:
                       * All fixed offset zones are valid.
                       * @override
                       * @type {boolean}
                       */
                      get: function() {
                        return true;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(FixedOffsetZone2.prototype, "name", {
                      /**
                       * The name of this zone.
                       * All fixed zones' names always start with "UTC" (plus optional offset)
                       * @override
                       * @type {string}
                       */
                      get: function() {
                        return this._fixed === 0 ? "UTC" : "UTC".concat((0, util_1.formatOffset)(this._fixed, "narrow"));
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(FixedOffsetZone2.prototype, "type", {
                      /**
                       * The type of zone. `fixed` for all instances of `FixedOffsetZone`.
                       * @override
                       * @type {string}
                       */
                      get: function() {
                        return "fixed";
                      },
                      enumerable: false,
                      configurable: true
                    });
                    FixedOffsetZone2.instance = function(offset) {
                      return offset === 0 ? FixedOffsetZone2.utcInstance : new FixedOffsetZone2(offset);
                    };
                    FixedOffsetZone2.parseSpecifier = function(s) {
                      if (s) {
                        var r = s.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
                        if (r) {
                          return new FixedOffsetZone2((0, util_1.signedOffset)(r[1], r[2]));
                        }
                      }
                      return null;
                    };
                    FixedOffsetZone2.prototype.equals = function(otherZone) {
                      return otherZone.type === "fixed" && otherZone._fixed === this._fixed;
                    };
                    FixedOffsetZone2.prototype.formatOffset = function(_ts_, format) {
                      return (0, util_1.formatOffset)(this._fixed, format);
                    };
                    FixedOffsetZone2.prototype.offset = function() {
                      return this._fixed;
                    };
                    FixedOffsetZone2.prototype.offsetName = function() {
                      return this.name;
                    };
                    return FixedOffsetZone2;
                  }(zone_1.Zone)
                );
                exports2.FixedOffsetZone = FixedOffsetZone;
              }
            ),
            /***/
            "./src/zones/invalidZone.ts": (
              /*!**********************************!*\
                !*** ./src/zones/invalidZone.ts ***!
                \**********************************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.InvalidZone = void 0;
                var tslib_1 = __webpack_require__2(
                  /*! tslib */
                  "./node_modules/tslib/tslib.es6.js"
                );
                var zone_1 = __webpack_require__2(
                  /*! ../zone */
                  "./src/zone.ts"
                );
                var InvalidZone = (
                  /** @class */
                  function(_super) {
                    tslib_1.__extends(InvalidZone2, _super);
                    function InvalidZone2(_zoneName) {
                      var _this = _super.call(this) || this;
                      _this._zoneName = _zoneName;
                      Object.setPrototypeOf(_this, InvalidZone2.prototype);
                      return _this;
                    }
                    Object.defineProperty(InvalidZone2.prototype, "type", {
                      /** @override **/
                      get: function() {
                        return "invalid";
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(InvalidZone2.prototype, "name", {
                      /** @override **/
                      get: function() {
                        return this._zoneName;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(InvalidZone2.prototype, "isUniversal", {
                      /** @override **/
                      get: function() {
                        return false;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    InvalidZone2.prototype.offsetName = function() {
                      return null;
                    };
                    InvalidZone2.prototype.formatOffset = function() {
                      return "";
                    };
                    InvalidZone2.prototype.offset = function() {
                      return NaN;
                    };
                    InvalidZone2.prototype.equals = function() {
                      return false;
                    };
                    Object.defineProperty(InvalidZone2.prototype, "isValid", {
                      /** @override **/
                      get: function() {
                        return false;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    return InvalidZone2;
                  }(zone_1.Zone)
                );
                exports2.InvalidZone = InvalidZone;
              }
            ),
            /***/
            "./src/zones/systemZone.ts": (
              /*!*********************************!*\
                !*** ./src/zones/systemZone.ts ***!
                \*********************************/
              /***/
              (__unused_webpack_module, exports2, __webpack_require__2) => {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.SystemZone = void 0;
                var tslib_1 = __webpack_require__2(
                  /*! tslib */
                  "./node_modules/tslib/tslib.es6.js"
                );
                var util_1 = __webpack_require__2(
                  /*! ../impl/util */
                  "./src/impl/util.ts"
                );
                var zone_1 = __webpack_require__2(
                  /*! ../zone */
                  "./src/zone.ts"
                );
                var singleton = null;
                var SystemZone = (
                  /** @class */
                  function(_super) {
                    tslib_1.__extends(SystemZone2, _super);
                    function SystemZone2() {
                      return _super !== null && _super.apply(this, arguments) || this;
                    }
                    Object.defineProperty(SystemZone2, "instance", {
                      /**
                       * Get a singleton instance of the local zone
                       * @return {SystemZone}
                       */
                      get: function() {
                        if (singleton === null) {
                          singleton = new SystemZone2();
                        }
                        return singleton;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(SystemZone2.prototype, "type", {
                      /** @override **/
                      get: function() {
                        return "system";
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(SystemZone2.prototype, "name", {
                      /** @override **/
                      get: function() {
                        return new Intl.DateTimeFormat().resolvedOptions().timeZone;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(SystemZone2.prototype, "isUniversal", {
                      /** @override **/
                      get: function() {
                        return false;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    SystemZone2.prototype.offsetName = function(ts, _a) {
                      var format = _a.format, locale = _a.locale;
                      return (0, util_1.parseZoneInfo)(ts, format, locale);
                    };
                    SystemZone2.prototype.formatOffset = function(ts, format) {
                      return (0, util_1.formatOffset)(this.offset(ts), format);
                    };
                    SystemZone2.prototype.offset = function(ts) {
                      return -new Date(ts).getTimezoneOffset();
                    };
                    SystemZone2.prototype.equals = function(otherZone) {
                      return otherZone.type === "system";
                    };
                    Object.defineProperty(SystemZone2.prototype, "isValid", {
                      /** @override **/
                      get: function() {
                        return true;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    return SystemZone2;
                  }(zone_1.Zone)
                );
                exports2.SystemZone = SystemZone;
              }
            ),
            /***/
            "./node_modules/tslib/tslib.es6.js": (
              /*!*****************************************!*\
                !*** ./node_modules/tslib/tslib.es6.js ***!
                \*****************************************/
              /***/
              (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  __assign: () => (
                    /* binding */
                    __assign
                  ),
                  /* harmony export */
                  __asyncDelegator: () => (
                    /* binding */
                    __asyncDelegator
                  ),
                  /* harmony export */
                  __asyncGenerator: () => (
                    /* binding */
                    __asyncGenerator
                  ),
                  /* harmony export */
                  __asyncValues: () => (
                    /* binding */
                    __asyncValues
                  ),
                  /* harmony export */
                  __await: () => (
                    /* binding */
                    __await
                  ),
                  /* harmony export */
                  __awaiter: () => (
                    /* binding */
                    __awaiter
                  ),
                  /* harmony export */
                  __classPrivateFieldGet: () => (
                    /* binding */
                    __classPrivateFieldGet
                  ),
                  /* harmony export */
                  __classPrivateFieldIn: () => (
                    /* binding */
                    __classPrivateFieldIn
                  ),
                  /* harmony export */
                  __classPrivateFieldSet: () => (
                    /* binding */
                    __classPrivateFieldSet
                  ),
                  /* harmony export */
                  __createBinding: () => (
                    /* binding */
                    __createBinding
                  ),
                  /* harmony export */
                  __decorate: () => (
                    /* binding */
                    __decorate
                  ),
                  /* harmony export */
                  __esDecorate: () => (
                    /* binding */
                    __esDecorate
                  ),
                  /* harmony export */
                  __exportStar: () => (
                    /* binding */
                    __exportStar
                  ),
                  /* harmony export */
                  __extends: () => (
                    /* binding */
                    __extends
                  ),
                  /* harmony export */
                  __generator: () => (
                    /* binding */
                    __generator
                  ),
                  /* harmony export */
                  __importDefault: () => (
                    /* binding */
                    __importDefault
                  ),
                  /* harmony export */
                  __importStar: () => (
                    /* binding */
                    __importStar
                  ),
                  /* harmony export */
                  __makeTemplateObject: () => (
                    /* binding */
                    __makeTemplateObject
                  ),
                  /* harmony export */
                  __metadata: () => (
                    /* binding */
                    __metadata
                  ),
                  /* harmony export */
                  __param: () => (
                    /* binding */
                    __param
                  ),
                  /* harmony export */
                  __propKey: () => (
                    /* binding */
                    __propKey
                  ),
                  /* harmony export */
                  __read: () => (
                    /* binding */
                    __read
                  ),
                  /* harmony export */
                  __rest: () => (
                    /* binding */
                    __rest
                  ),
                  /* harmony export */
                  __runInitializers: () => (
                    /* binding */
                    __runInitializers
                  ),
                  /* harmony export */
                  __setFunctionName: () => (
                    /* binding */
                    __setFunctionName
                  ),
                  /* harmony export */
                  __spread: () => (
                    /* binding */
                    __spread
                  ),
                  /* harmony export */
                  __spreadArray: () => (
                    /* binding */
                    __spreadArray
                  ),
                  /* harmony export */
                  __spreadArrays: () => (
                    /* binding */
                    __spreadArrays
                  ),
                  /* harmony export */
                  __values: () => (
                    /* binding */
                    __values
                  ),
                  /* harmony export */
                  "default": () => __WEBPACK_DEFAULT_EXPORT__
                  /* harmony export */
                });
                var extendStatics = function(d, b) {
                  extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                  } instanceof Array && function(d2, b2) {
                    d2.__proto__ = b2;
                  } || function(d2, b2) {
                    for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
                  };
                  return extendStatics(d, b);
                };
                function __extends(d, b) {
                  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                  extendStatics(d, b);
                  function __() {
                    this.constructor = d;
                  }
                  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                }
                var __assign = function() {
                  __assign = Object.assign || function __assign2(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                      s = arguments[i];
                      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                    return t;
                  };
                  return __assign.apply(this, arguments);
                };
                function __rest(s, e) {
                  var t = {};
                  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
                  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
                  }
                  return t;
                }
                function __decorate(decorators, target, key, desc) {
                  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                  return c > 3 && r && Object.defineProperty(target, key, r), r;
                }
                function __param(paramIndex, decorator) {
                  return function(target, key) {
                    decorator(target, key, paramIndex);
                  };
                }
                function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
                  function accept(f) {
                    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
                    return f;
                  }
                  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
                  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
                  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
                  var _, done = false;
                  for (var i = decorators.length - 1; i >= 0; i--) {
                    var context = {};
                    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
                    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
                    context.addInitializer = function(f) {
                      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
                      extraInitializers.push(accept(f || null));
                    };
                    var result = (0, decorators[i])(kind === "accessor" ? {
                      get: descriptor.get,
                      set: descriptor.set
                    } : descriptor[key], context);
                    if (kind === "accessor") {
                      if (result === void 0) continue;
                      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
                      if (_ = accept(result.get)) descriptor.get = _;
                      if (_ = accept(result.set)) descriptor.set = _;
                      if (_ = accept(result.init)) initializers.unshift(_);
                    } else if (_ = accept(result)) {
                      if (kind === "field") initializers.unshift(_);
                      else descriptor[key] = _;
                    }
                  }
                  if (target) Object.defineProperty(target, contextIn.name, descriptor);
                  done = true;
                }
                ;
                function __runInitializers(thisArg, initializers, value) {
                  var useValue = arguments.length > 2;
                  for (var i = 0; i < initializers.length; i++) {
                    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
                  }
                  return useValue ? value : void 0;
                }
                ;
                function __propKey(x) {
                  return typeof x === "symbol" ? x : "".concat(x);
                }
                ;
                function __setFunctionName(f, name, prefix) {
                  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
                  return Object.defineProperty(f, "name", {
                    configurable: true,
                    value: prefix ? "".concat(prefix, " ", name) : name
                  });
                }
                ;
                function __metadata(metadataKey, metadataValue) {
                  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
                }
                function __awaiter(thisArg, _arguments, P, generator) {
                  function adopt(value) {
                    return value instanceof P ? value : new P(function(resolve) {
                      resolve(value);
                    });
                  }
                  return new (P || (P = Promise))(function(resolve, reject) {
                    function fulfilled(value) {
                      try {
                        step(generator.next(value));
                      } catch (e) {
                        reject(e);
                      }
                    }
                    function rejected(value) {
                      try {
                        step(generator["throw"](value));
                      } catch (e) {
                        reject(e);
                      }
                    }
                    function step(result) {
                      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                  });
                }
                function __generator(thisArg, body) {
                  var _ = {
                    label: 0,
                    sent: function() {
                      if (t[0] & 1) throw t[1];
                      return t[1];
                    },
                    trys: [],
                    ops: []
                  }, f, y, t, g;
                  return g = {
                    next: verb(0),
                    "throw": verb(1),
                    "return": verb(2)
                  }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
                    return this;
                  }), g;
                  function verb(n) {
                    return function(v) {
                      return step([n, v]);
                    };
                  }
                  function step(op) {
                    if (f) throw new TypeError("Generator is already executing.");
                    while (g && (g = 0, op[0] && (_ = 0)), _) try {
                      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                      if (y = 0, t) op = [op[0] & 2, t.value];
                      switch (op[0]) {
                        case 0:
                        case 1:
                          t = op;
                          break;
                        case 4:
                          _.label++;
                          return {
                            value: op[1],
                            done: false
                          };
                        case 5:
                          _.label++;
                          y = op[1];
                          op = [0];
                          continue;
                        case 7:
                          op = _.ops.pop();
                          _.trys.pop();
                          continue;
                        default:
                          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                          }
                          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];
                            break;
                          }
                          if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                          }
                          if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                          }
                          if (t[2]) _.ops.pop();
                          _.trys.pop();
                          continue;
                      }
                      op = body.call(thisArg, _);
                    } catch (e) {
                      op = [6, e];
                      y = 0;
                    } finally {
                      f = t = 0;
                    }
                    if (op[0] & 5) throw op[1];
                    return {
                      value: op[0] ? op[1] : void 0,
                      done: true
                    };
                  }
                }
                var __createBinding = Object.create ? function(o, m, k, k2) {
                  if (k2 === void 0) k2 = k;
                  var desc = Object.getOwnPropertyDescriptor(m, k);
                  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                    desc = {
                      enumerable: true,
                      get: function() {
                        return m[k];
                      }
                    };
                  }
                  Object.defineProperty(o, k2, desc);
                } : function(o, m, k, k2) {
                  if (k2 === void 0) k2 = k;
                  o[k2] = m[k];
                };
                function __exportStar(m, o) {
                  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
                }
                function __values(o) {
                  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
                  if (m) return m.call(o);
                  if (o && typeof o.length === "number") return {
                    next: function() {
                      if (o && i >= o.length) o = void 0;
                      return {
                        value: o && o[i++],
                        done: !o
                      };
                    }
                  };
                  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
                }
                function __read(o, n) {
                  var m = typeof Symbol === "function" && o[Symbol.iterator];
                  if (!m) return o;
                  var i = m.call(o), r, ar = [], e;
                  try {
                    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
                  } catch (error) {
                    e = {
                      error
                    };
                  } finally {
                    try {
                      if (r && !r.done && (m = i["return"])) m.call(i);
                    } finally {
                      if (e) throw e.error;
                    }
                  }
                  return ar;
                }
                function __spread() {
                  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
                  return ar;
                }
                function __spreadArrays() {
                  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
                  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
                  return r;
                }
                function __spreadArray(to, from, pack) {
                  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
                    if (ar || !(i in from)) {
                      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                      ar[i] = from[i];
                    }
                  }
                  return to.concat(ar || Array.prototype.slice.call(from));
                }
                function __await(v) {
                  return this instanceof __await ? (this.v = v, this) : new __await(v);
                }
                function __asyncGenerator(thisArg, _arguments, generator) {
                  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                  var g = generator.apply(thisArg, _arguments || []), i, q = [];
                  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
                    return this;
                  }, i;
                  function verb(n) {
                    if (g[n]) i[n] = function(v) {
                      return new Promise(function(a, b) {
                        q.push([n, v, a, b]) > 1 || resume(n, v);
                      });
                    };
                  }
                  function resume(n, v) {
                    try {
                      step(g[n](v));
                    } catch (e) {
                      settle(q[0][3], e);
                    }
                  }
                  function step(r) {
                    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
                  }
                  function fulfill(value) {
                    resume("next", value);
                  }
                  function reject(value) {
                    resume("throw", value);
                  }
                  function settle(f, v) {
                    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
                  }
                }
                function __asyncDelegator(o) {
                  var i, p;
                  return i = {}, verb("next"), verb("throw", function(e) {
                    throw e;
                  }), verb("return"), i[Symbol.iterator] = function() {
                    return this;
                  }, i;
                  function verb(n, f) {
                    i[n] = o[n] ? function(v) {
                      return (p = !p) ? {
                        value: __await(o[n](v)),
                        done: false
                      } : f ? f(v) : v;
                    } : f;
                  }
                }
                function __asyncValues(o) {
                  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                  var m = o[Symbol.asyncIterator], i;
                  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
                    return this;
                  }, i);
                  function verb(n) {
                    i[n] = o[n] && function(v) {
                      return new Promise(function(resolve, reject) {
                        v = o[n](v), settle(resolve, reject, v.done, v.value);
                      });
                    };
                  }
                  function settle(resolve, reject, d, v) {
                    Promise.resolve(v).then(function(v2) {
                      resolve({
                        value: v2,
                        done: d
                      });
                    }, reject);
                  }
                }
                function __makeTemplateObject(cooked, raw) {
                  if (Object.defineProperty) {
                    Object.defineProperty(cooked, "raw", {
                      value: raw
                    });
                  } else {
                    cooked.raw = raw;
                  }
                  return cooked;
                }
                ;
                var __setModuleDefault = Object.create ? function(o, v) {
                  Object.defineProperty(o, "default", {
                    enumerable: true,
                    value: v
                  });
                } : function(o, v) {
                  o["default"] = v;
                };
                function __importStar(mod) {
                  if (mod && mod.__esModule) return mod;
                  var result = {};
                  if (mod != null) {
                    for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
                  }
                  __setModuleDefault(result, mod);
                  return result;
                }
                function __importDefault(mod) {
                  return mod && mod.__esModule ? mod : {
                    default: mod
                  };
                }
                function __classPrivateFieldGet(receiver, state, kind, f) {
                  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
                  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
                  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
                }
                function __classPrivateFieldSet(receiver, state, value, kind, f) {
                  if (kind === "m") throw new TypeError("Private method is not writable");
                  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
                  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
                  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
                }
                function __classPrivateFieldIn(state, receiver) {
                  if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
                  return typeof state === "function" ? receiver === state : state.has(receiver);
                }
                const __WEBPACK_DEFAULT_EXPORT__ = {
                  __extends,
                  __assign,
                  __rest,
                  __decorate,
                  __param,
                  __metadata,
                  __awaiter,
                  __generator,
                  __createBinding,
                  __exportStar,
                  __values,
                  __read,
                  __spread,
                  __spreadArrays,
                  __spreadArray,
                  __await,
                  __asyncGenerator,
                  __asyncDelegator,
                  __asyncValues,
                  __makeTemplateObject,
                  __importStar,
                  __importDefault,
                  __classPrivateFieldGet,
                  __classPrivateFieldSet,
                  __classPrivateFieldIn
                };
              }
            )
            /******/
          };
          var __webpack_module_cache__ = {};
          function __webpack_require__(moduleId) {
            var cachedModule = __webpack_module_cache__[moduleId];
            if (cachedModule !== void 0) {
              return cachedModule.exports;
            }
            var module2 = __webpack_module_cache__[moduleId] = {
              /******/
              // no module.id needed
              /******/
              // no module.loaded needed
              /******/
              exports: {}
              /******/
            };
            __webpack_modules__[moduleId](module2, module2.exports, __webpack_require__);
            return module2.exports;
          }
          (() => {
            __webpack_require__.d = (exports2, definition) => {
              for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                  Object.defineProperty(exports2, key, {
                    enumerable: true,
                    get: definition[key]
                  });
                }
              }
            };
          })();
          (() => {
            __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
          })();
          (() => {
            __webpack_require__.r = (exports2) => {
              if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(exports2, Symbol.toStringTag, {
                  value: "Module"
                });
              }
              Object.defineProperty(exports2, "__esModule", {
                value: true
              });
            };
          })();
          var __webpack_exports__ = __webpack_require__("./src/index.ts");
          return __webpack_exports__;
        })()
      );
    });
  }
});

// node_modules/ngx-mat-timepicker/fesm2022/ngx-mat-timepicker.mjs
var import_ts_luxon = __toESM(require_ts_luxon_umd(), 1);

// node_modules/@angular/material/fesm2022/toolbar.mjs
var _c0 = ["*", [["mat-toolbar-row"]]];
var _c1 = ["*", "mat-toolbar-row"];
var MatToolbarRow = class _MatToolbarRow {
  static {
    this.ɵfac = function MatToolbarRow_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatToolbarRow)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MatToolbarRow,
      selectors: [["mat-toolbar-row"]],
      hostAttrs: [1, "mat-toolbar-row"],
      exportAs: ["matToolbarRow"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbarRow, [{
    type: Directive,
    args: [{
      selector: "mat-toolbar-row",
      exportAs: "matToolbarRow",
      host: {
        "class": "mat-toolbar-row"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatToolbar = class _MatToolbar {
  constructor(_elementRef, _platform, document) {
    this._elementRef = _elementRef;
    this._platform = _platform;
    this._document = document;
  }
  ngAfterViewInit() {
    if (this._platform.isBrowser) {
      this._checkToolbarMixedModes();
      this._toolbarRows.changes.subscribe(() => this._checkToolbarMixedModes());
    }
  }
  /**
   * Throws an exception when developers are attempting to combine the different toolbar row modes.
   */
  _checkToolbarMixedModes() {
    if (this._toolbarRows.length && (typeof ngDevMode === "undefined" || ngDevMode)) {
      const isCombinedUsage = Array.from(this._elementRef.nativeElement.childNodes).filter((node) => !(node.classList && node.classList.contains("mat-toolbar-row"))).filter((node) => node.nodeType !== (this._document ? this._document.COMMENT_NODE : 8)).some((node) => !!(node.textContent && node.textContent.trim()));
      if (isCombinedUsage) {
        throwToolbarMixedModesError();
      }
    }
  }
  static {
    this.ɵfac = function MatToolbar_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatToolbar)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Platform), ɵɵdirectiveInject(DOCUMENT));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MatToolbar,
      selectors: [["mat-toolbar"]],
      contentQueries: function MatToolbar_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, MatToolbarRow, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._toolbarRows = _t);
        }
      },
      hostAttrs: [1, "mat-toolbar"],
      hostVars: 6,
      hostBindings: function MatToolbar_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.color ? "mat-" + ctx.color : "");
          ɵɵclassProp("mat-toolbar-multiple-rows", ctx._toolbarRows.length > 0)("mat-toolbar-single-row", ctx._toolbarRows.length === 0);
        }
      },
      inputs: {
        color: "color"
      },
      exportAs: ["matToolbar"],
      standalone: true,
      features: [ɵɵStandaloneFeature],
      ngContentSelectors: _c1,
      decls: 2,
      vars: 0,
      template: function MatToolbar_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef(_c0);
          ɵɵprojection(0);
          ɵɵprojection(1, 1);
        }
      },
      styles: [".mat-toolbar{background:var(--mat-toolbar-container-background-color, var(--mat-app-surface));color:var(--mat-toolbar-container-text-color, var(--mat-app-on-surface))}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font, var(--mat-app-title-large-font));font-size:var(--mat-toolbar-title-text-size, var(--mat-app-title-large-size));line-height:var(--mat-toolbar-title-text-line-height, var(--mat-app-title-large-line-height));font-weight:var(--mat-toolbar-title-text-weight, var(--mat-app-title-large-weight));letter-spacing:var(--mat-toolbar-title-text-tracking, var(--mat-app-title-large-tracking));margin:0}.cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mdc-text-button-label-text-color:var(--mat-toolbar-container-text-color, var(--mat-app-on-surface));--mdc-outlined-button-label-text-color:var(--mat-toolbar-container-text-color, var(--mat-app-on-surface))}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height)}}"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbar, [{
    type: Component,
    args: [{
      selector: "mat-toolbar",
      exportAs: "matToolbar",
      host: {
        "class": "mat-toolbar",
        "[class]": 'color ? "mat-" + color : ""',
        "[class.mat-toolbar-multiple-rows]": "_toolbarRows.length > 0",
        "[class.mat-toolbar-single-row]": "_toolbarRows.length === 0"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      standalone: true,
      template: '<ng-content></ng-content>\n<ng-content select="mat-toolbar-row"></ng-content>\n',
      styles: [".mat-toolbar{background:var(--mat-toolbar-container-background-color, var(--mat-app-surface));color:var(--mat-toolbar-container-text-color, var(--mat-app-on-surface))}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font, var(--mat-app-title-large-font));font-size:var(--mat-toolbar-title-text-size, var(--mat-app-title-large-size));line-height:var(--mat-toolbar-title-text-line-height, var(--mat-app-title-large-line-height));font-weight:var(--mat-toolbar-title-text-weight, var(--mat-app-title-large-weight));letter-spacing:var(--mat-toolbar-title-text-tracking, var(--mat-app-title-large-tracking));margin:0}.cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mdc-text-button-label-text-color:var(--mat-toolbar-container-text-color, var(--mat-app-on-surface));--mdc-outlined-button-label-text-color:var(--mat-toolbar-container-text-color, var(--mat-app-on-surface))}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height)}}"]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Platform
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], {
    color: [{
      type: Input
    }],
    _toolbarRows: [{
      type: ContentChildren,
      args: [MatToolbarRow, {
        descendants: true
      }]
    }]
  });
})();
function throwToolbarMixedModesError() {
  throw Error("MatToolbar: Attempting to combine different toolbar modes. Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content inside of a `<mat-toolbar>` for a single row.");
}
var MatToolbarModule = class _MatToolbarModule {
  static {
    this.ɵfac = function MatToolbarModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatToolbarModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _MatToolbarModule,
      imports: [MatCommonModule, MatToolbar, MatToolbarRow],
      exports: [MatToolbar, MatToolbarRow, MatCommonModule]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [MatCommonModule, MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbarModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, MatToolbar, MatToolbarRow],
      exports: [MatToolbar, MatToolbarRow, MatCommonModule]
    }]
  }], null, null);
})();

// node_modules/ngx-mat-timepicker/fesm2022/ngx-mat-timepicker.mjs
var _c02 = ["clockFace"];
var _c12 = ["clockHand"];
var _c2 = ["*", "*"];
var _c3 = (a0) => ({
  "clock-face__clock-hand_minute": a0
});
var _c4 = (a0) => ({
  "transform": a0
});
var _c5 = (a0) => ({
  $implicit: a0
});
function NgxMatTimepickerFaceComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 10);
    ɵɵpipe(1, "activeHour");
    ɵɵtext(2);
    ɵɵpipe(3, "timeLocalizer");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const time_r1 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("color", ɵɵpipeBind3(1, 4, time_r1.time, ctx_r1.selectedTime == null ? null : ctx_r1.selectedTime.time, ctx_r1.isClockFaceDisabled) ? ctx_r1.color : void 0)("ngStyle", ɵɵpureFunction1(11, _c4, "rotateZ(-" + time_r1.angle + "deg)"))("disabled", time_r1.disabled);
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind2(3, 8, time_r1.time, ctx_r1.timeUnit.HOUR), " ");
  }
}
function NgxMatTimepickerFaceComponent_ng_template_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 13);
    ɵɵelement(1, "input", 14, 4);
    ɵɵpipe(3, "minutesFormatter");
    ɵɵpipe(4, "timeLocalizer");
    ɵɵelementStart(5, "button", 10);
    ɵɵpipe(6, "activeMinute");
    ɵɵpipe(7, "activeMinute");
    ɵɵtext(8);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const time_r3 = ctx.$implicit;
    const current_r4 = ɵɵreference(2);
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngStyle", ɵɵpureFunction1(24, _c4, "rotateZ(" + time_r3.angle + "deg)"));
    ɵɵadvance();
    ɵɵproperty("value", ɵɵpipeBind2(4, 11, ɵɵpipeBind2(3, 8, time_r3.time, ctx_r1.minutesGap), ctx_r1.timeUnit.MINUTE));
    ɵɵadvance(4);
    ɵɵclassProp("dot", ctx_r1.dottedMinutesInGap && current_r4.value === "" && !ɵɵpipeBind4(6, 14, time_r3.time, ctx_r1.selectedTime == null ? null : ctx_r1.selectedTime.time, 1, ctx_r1.isClockFaceDisabled));
    ɵɵproperty("color", ɵɵpipeBind4(7, 19, time_r3.time, ctx_r1.selectedTime == null ? null : ctx_r1.selectedTime.time, ctx_r1.minutesGap, ctx_r1.isClockFaceDisabled) ? ctx_r1.color : void 0)("ngStyle", ɵɵpureFunction1(26, _c4, "rotateZ(-" + time_r3.angle + "deg)"))("disabled", time_r3.disabled);
    ɵɵadvance(3);
    ɵɵtextInterpolate1(" ", current_r4.value, " ");
  }
}
function NgxMatTimepickerFaceComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 11);
    ɵɵtemplate(1, NgxMatTimepickerFaceComponent_ng_template_2_div_1_Template, 9, 28, "div", 12);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r1.faceTime)("ngForTrackBy", ctx_r1.trackByTime);
  }
}
function NgxMatTimepickerFaceComponent_div_6_div_1_ng_content_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 0, ["*ngTemplateOutlet", "hourButton; context: {$implicit: time}"]);
  }
}
function NgxMatTimepickerFaceComponent_div_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 13);
    ɵɵtemplate(1, NgxMatTimepickerFaceComponent_div_6_div_1_ng_content_1_Template, 1, 0, "ng-content", 16);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const time_r5 = ctx.$implicit;
    ɵɵnextContext(2);
    const hourButton_r6 = ɵɵreference(1);
    ɵɵproperty("ngStyle", ɵɵpureFunction1(3, _c4, "rotateZ(" + time_r5.angle + "deg)"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", hourButton_r6)("ngTemplateOutletContext", ɵɵpureFunction1(5, _c5, time_r5));
  }
}
function NgxMatTimepickerFaceComponent_div_6_div_3_div_1_ng_content_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 1, ["*ngTemplateOutlet", "hourButton; context: {$implicit: time}"]);
  }
}
function NgxMatTimepickerFaceComponent_div_6_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 19);
    ɵɵtemplate(1, NgxMatTimepickerFaceComponent_div_6_div_3_div_1_ng_content_1_Template, 1, 0, "ng-content", 16);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const time_r7 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    const hourButton_r6 = ɵɵreference(1);
    ɵɵstyleProp("top", "calc(50% - " + ctx_r1.innerClockFaceSize + "px)")("height", ctx_r1.innerClockFaceSize, "px");
    ɵɵproperty("ngStyle", ɵɵpureFunction1(7, _c4, "rotateZ(" + time_r7.angle + "deg)"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", hourButton_r6)("ngTemplateOutletContext", ɵɵpureFunction1(9, _c5, time_r7));
  }
}
function NgxMatTimepickerFaceComponent_div_6_div_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 17);
    ɵɵtemplate(1, NgxMatTimepickerFaceComponent_div_6_div_3_div_1_Template, 2, 11, "div", 18);
    ɵɵpipe(2, "slice");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ɵɵpipeBind3(2, 2, ctx_r1.faceTime, 12, 24))("ngForTrackBy", ctx_r1.trackByTime);
  }
}
function NgxMatTimepickerFaceComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 11);
    ɵɵtemplate(1, NgxMatTimepickerFaceComponent_div_6_div_1_Template, 2, 7, "div", 12);
    ɵɵpipe(2, "slice");
    ɵɵtemplate(3, NgxMatTimepickerFaceComponent_div_6_div_3_Template, 3, 6, "div", 15);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngForOf", ɵɵpipeBind3(2, 3, ctx_r1.faceTime, 0, 12))("ngForTrackBy", ctx_r1.trackByTime);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.faceTime.length > 12);
  }
}
function NgxMatTimepickerFaceComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 20);
    ɵɵelement(1, "span", 21);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("color", ctx_r1.color);
  }
}
var _c6 = (a0) => ({
  "active": a0
});
function NgxMatTimepickerPeriodComponent_ng_template_6_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 5);
    ɵɵlistener("@scaleInOut.done", function NgxMatTimepickerPeriodComponent_ng_template_6_div_0_Template_div_animation_scaleInOut_done_0_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.animationDone());
    });
    ɵɵelementStart(1, "p");
    ɵɵtext(2, "Current time would be invalid in this period.");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    ɵɵproperty("@scaleInOut", void 0);
  }
}
function NgxMatTimepickerPeriodComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NgxMatTimepickerPeriodComponent_ng_template_6_div_0_Template, 3, 1, "div", 4);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("ngIf", !ctx_r2.isPeriodAvailable);
  }
}
function NgxMatTimepickerDialControlComponent_input_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "input", 2);
    ɵɵpipe(1, "timeLocalizer");
    ɵɵlistener("ngModelChange", function NgxMatTimepickerDialControlComponent_input_0_Template_input_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.time = $event);
    })("input", function NgxMatTimepickerDialControlComponent_input_0_Template_input_input_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.updateTime());
    })("focus", function NgxMatTimepickerDialControlComponent_input_0_Template_input_focus_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.saveTimeAndChangeTimeUnit($event, ctx_r1.timeUnit));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction1(8, _c6, ctx_r1.isActive))("ngModel", ɵɵpipeBind3(1, 4, ctx_r1.time, ctx_r1.timeUnit, true))("disabled", ctx_r1.disabled)("ngxMatTimepickerAutofocus", ctx_r1.isActive);
  }
}
function NgxMatTimepickerDialControlComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "input", 3);
    ɵɵpipe(1, "ngxMatTimepickerParser");
    ɵɵpipe(2, "timeLocalizer");
    ɵɵlistener("ngModelChange", function NgxMatTimepickerDialControlComponent_ng_template_1_Template_input_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onModelChange($event));
    })("input", function NgxMatTimepickerDialControlComponent_ng_template_1_Template_input_input_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.updateTime());
    })("focus", function NgxMatTimepickerDialControlComponent_ng_template_1_Template_input_focus_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.saveTimeAndChangeTimeUnit($event, ctx_r1.timeUnit));
    })("keydown", function NgxMatTimepickerDialControlComponent_ng_template_1_Template_input_keydown_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onKeydown($event));
    })("keypress", function NgxMatTimepickerDialControlComponent_ng_template_1_Template_input_keypress_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.changeTimeByKeyboard($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction1(11, _c6, ctx_r1.isActive))("ngModel", ɵɵpipeBind3(2, 7, ɵɵpipeBind2(1, 4, ctx_r1.time, ctx_r1.timeUnit), ctx_r1.timeUnit, true))("disabled", ctx_r1.disabled)("ngxMatTimepickerAutofocus", ctx_r1.isActive);
  }
}
var _c7 = (a0) => ({
  "timepicker-dial__hint-container--hidden": a0
});
function NgxMatTimepickerDialComponent_ngx_mat_timepicker_period_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-mat-timepicker-period", 8);
    ɵɵlistener("periodChanged", function NgxMatTimepickerDialComponent_ngx_mat_timepicker_period_7_Template_ngx_mat_timepicker_period_periodChanged_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.changePeriod($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("selectedPeriod", ctx_r1.period)("activeTimeUnit", ctx_r1.activeTimeUnit)("maxTime", ctx_r1.maxTime)("minTime", ctx_r1.minTime)("format", ctx_r1.format)("hours", ctx_r1.hours)("minutes", ctx_r1.minutes)("selectedHour", ctx_r1.hour)("meridiems", ctx_r1.meridiems);
  }
}
function NgxMatTimepickerDialComponent_div_8_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMatTimepickerDialComponent_div_8_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "small", 11);
    ɵɵtext(1, " * use arrows (");
    ɵɵelementStart(2, "span");
    ɵɵtext(3, "⇅");
    ɵɵelementEnd();
    ɵɵtext(4, ") to change the time");
    ɵɵelementEnd();
  }
}
function NgxMatTimepickerDialComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 9);
    ɵɵtemplate(1, NgxMatTimepickerDialComponent_div_8_ng_container_1_Template, 1, 0, "ng-container", 10)(2, NgxMatTimepickerDialComponent_div_8_ng_template_2_Template, 5, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const editableHintDefault_r3 = ɵɵreference(3);
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction1(2, _c7, !ctx_r1.isHintVisible));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.editableHintTmpl ? ctx_r1.editableHintTmpl : editableHintDefault_r3);
  }
}
var _c8 = ["*"];
function NgxMatTimepickerContentComponent_div_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMatTimepickerContentComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtemplate(1, NgxMatTimepickerContentComponent_div_0_ng_container_1_Template, 1, 0, "ng-container", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    ɵɵnextContext();
    const timepickerOutlet_r1 = ɵɵreference(4);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", timepickerOutlet_r1);
  }
}
function NgxMatTimepickerContentComponent_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMatTimepickerContentComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NgxMatTimepickerContentComponent_ng_template_1_ng_container_0_Template, 1, 0, "ng-container", 3);
  }
  if (rf & 2) {
    ɵɵnextContext();
    const timepickerOutlet_r1 = ɵɵreference(4);
    ɵɵproperty("ngTemplateOutlet", timepickerOutlet_r1);
  }
}
function NgxMatTimepickerContentComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
function NgxMatTimepickerDialogComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 15);
    ɵɵtext(1, "CANCEL ");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("color", ctx_r1.color);
  }
}
function NgxMatTimepickerDialogComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 15);
    ɵɵtext(1, "OK ");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("color", ctx_r1.color);
  }
}
function NgxMatTimepickerDialogComponent_div_14_ngx_mat_timepicker_24_hours_face_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-mat-timepicker-24-hours-face", 17);
    ɵɵpipe(1, "async");
    ɵɵlistener("hourChange", function NgxMatTimepickerDialogComponent_div_14_ngx_mat_timepicker_24_hours_face_1_Template_ngx_mat_timepicker_24_hours_face_hourChange_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onHourChange($event));
    })("hourSelected", function NgxMatTimepickerDialogComponent_div_14_ngx_mat_timepicker_24_hours_face_1_Template_ngx_mat_timepicker_24_hours_face_hourSelected_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onHourSelected($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("color", ctx_r1.color)("selectedHour", ɵɵpipeBind1(1, 5, ctx_r1.selectedHour))("minTime", ctx_r1.data.minTime)("maxTime", ctx_r1.data.maxTime)("format", ctx_r1.data.format);
  }
}
function NgxMatTimepickerDialogComponent_div_14_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-mat-timepicker-12-hours-face", 18);
    ɵɵpipe(1, "async");
    ɵɵpipe(2, "async");
    ɵɵlistener("hourChange", function NgxMatTimepickerDialogComponent_div_14_ng_template_2_Template_ngx_mat_timepicker_12_hours_face_hourChange_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onHourChange($event));
    })("hourSelected", function NgxMatTimepickerDialogComponent_div_14_ng_template_2_Template_ngx_mat_timepicker_12_hours_face_hourSelected_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onHourSelected($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("color", ctx_r1.color)("selectedHour", ɵɵpipeBind1(1, 5, ctx_r1.selectedHour))("period", ɵɵpipeBind1(2, 7, ctx_r1.selectedPeriod))("minTime", ctx_r1.data.minTime)("maxTime", ctx_r1.data.maxTime);
  }
}
function NgxMatTimepickerDialogComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtemplate(1, NgxMatTimepickerDialogComponent_div_14_ngx_mat_timepicker_24_hours_face_1_Template, 2, 7, "ngx-mat-timepicker-24-hours-face", 16)(2, NgxMatTimepickerDialogComponent_div_14_ng_template_2_Template, 3, 9, "ng-template", null, 2, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ampmHours_r5 = ɵɵreference(3);
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.data.format === 24)("ngIfElse", ampmHours_r5);
  }
}
function NgxMatTimepickerDialogComponent_ngx_mat_timepicker_minutes_face_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-mat-timepicker-minutes-face", 19);
    ɵɵpipe(1, "async");
    ɵɵpipe(2, "async");
    ɵɵpipe(3, "async");
    ɵɵlistener("minuteChange", function NgxMatTimepickerDialogComponent_ngx_mat_timepicker_minutes_face_15_Template_ngx_mat_timepicker_minutes_face_minuteChange_0_listener($event) {
      ɵɵrestoreView(_r6);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onMinuteChange($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("color", ctx_r1.color)("dottedMinutesInGap", ctx_r1.data.dottedMinutesInGap)("selectedMinute", ɵɵpipeBind1(1, 9, ctx_r1.selectedMinute))("selectedHour", (tmp_6_0 = ɵɵpipeBind1(2, 11, ctx_r1.selectedHour)) == null ? null : tmp_6_0.time)("minTime", ctx_r1.data.minTime)("maxTime", ctx_r1.data.maxTime)("format", ctx_r1.data.format)("period", ɵɵpipeBind1(3, 13, ctx_r1.selectedPeriod))("minutesGap", ctx_r1.data.minutesGap);
  }
}
function NgxMatTimepickerDialogComponent_ng_container_18_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMatTimepickerDialogComponent_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMatTimepickerStandaloneComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 15);
    ɵɵtext(1, "CANCEL ");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("color", ctx_r1.color);
  }
}
function NgxMatTimepickerStandaloneComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 15);
    ɵɵtext(1, "OK ");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("color", ctx_r1.color);
  }
}
function NgxMatTimepickerStandaloneComponent_div_14_ngx_mat_timepicker_24_hours_face_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-mat-timepicker-24-hours-face", 17);
    ɵɵpipe(1, "async");
    ɵɵlistener("hourChange", function NgxMatTimepickerStandaloneComponent_div_14_ngx_mat_timepicker_24_hours_face_1_Template_ngx_mat_timepicker_24_hours_face_hourChange_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onHourChange($event));
    })("hourSelected", function NgxMatTimepickerStandaloneComponent_div_14_ngx_mat_timepicker_24_hours_face_1_Template_ngx_mat_timepicker_24_hours_face_hourSelected_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onHourSelected($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("color", ctx_r1.color)("selectedHour", ɵɵpipeBind1(1, 5, ctx_r1.selectedHour))("minTime", ctx_r1.data.minTime)("maxTime", ctx_r1.data.maxTime)("format", ctx_r1.data.format);
  }
}
function NgxMatTimepickerStandaloneComponent_div_14_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-mat-timepicker-12-hours-face", 18);
    ɵɵpipe(1, "async");
    ɵɵpipe(2, "async");
    ɵɵlistener("hourChange", function NgxMatTimepickerStandaloneComponent_div_14_ng_template_2_Template_ngx_mat_timepicker_12_hours_face_hourChange_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onHourChange($event));
    })("hourSelected", function NgxMatTimepickerStandaloneComponent_div_14_ng_template_2_Template_ngx_mat_timepicker_12_hours_face_hourSelected_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onHourSelected($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("color", ctx_r1.color)("selectedHour", ɵɵpipeBind1(1, 5, ctx_r1.selectedHour))("period", ɵɵpipeBind1(2, 7, ctx_r1.selectedPeriod))("minTime", ctx_r1.data.minTime)("maxTime", ctx_r1.data.maxTime);
  }
}
function NgxMatTimepickerStandaloneComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtemplate(1, NgxMatTimepickerStandaloneComponent_div_14_ngx_mat_timepicker_24_hours_face_1_Template, 2, 7, "ngx-mat-timepicker-24-hours-face", 16)(2, NgxMatTimepickerStandaloneComponent_div_14_ng_template_2_Template, 3, 9, "ng-template", null, 2, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ampmHours_r5 = ɵɵreference(3);
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.data.format === 24)("ngIfElse", ampmHours_r5);
  }
}
function NgxMatTimepickerStandaloneComponent_ngx_mat_timepicker_minutes_face_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-mat-timepicker-minutes-face", 19);
    ɵɵpipe(1, "async");
    ɵɵpipe(2, "async");
    ɵɵpipe(3, "async");
    ɵɵlistener("minuteChange", function NgxMatTimepickerStandaloneComponent_ngx_mat_timepicker_minutes_face_15_Template_ngx_mat_timepicker_minutes_face_minuteChange_0_listener($event) {
      ɵɵrestoreView(_r6);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onMinuteChange($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("dottedMinutesInGap", ctx_r1.data.dottedMinutesInGap)("color", ctx_r1.color)("selectedMinute", ɵɵpipeBind1(1, 9, ctx_r1.selectedMinute))("selectedHour", (tmp_6_0 = ɵɵpipeBind1(2, 11, ctx_r1.selectedHour)) == null ? null : tmp_6_0.time)("minTime", ctx_r1.data.minTime)("maxTime", ctx_r1.data.maxTime)("format", ctx_r1.data.format)("period", ɵɵpipeBind1(3, 13, ctx_r1.selectedPeriod))("minutesGap", ctx_r1.data.minutesGap);
  }
}
function NgxMatTimepickerStandaloneComponent_ng_container_18_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMatTimepickerStandaloneComponent_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMatTimepickerComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "ngx-mat-timepicker-provider");
  }
}
var _c9 = [[["", "ngxMatTimepickerToggleIcon", ""]]];
var _c10 = ["[ngxMatTimepickerToggleIcon]"];
function NgxMatTimepickerToggleComponent__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 2);
    ɵɵelement(1, "path", 3);
    ɵɵelementEnd();
  }
}
var _c11 = (a0) => ({
  "ngx-mat-timepicker--disabled": a0
});
function NgxMatTimepickerFieldComponent_mat_form_field_5_mat_option_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-option", 12);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const option_r4 = ctx.$implicit;
    ɵɵproperty("value", option_r4);
    ɵɵadvance();
    ɵɵtextInterpolate(option_r4);
  }
}
function NgxMatTimepickerFieldComponent_mat_form_field_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "mat-form-field", 9)(1, "mat-select", 10);
    ɵɵlistener("selectionChange", function NgxMatTimepickerFieldComponent_mat_form_field_5_Template_mat_select_selectionChange_1_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.changePeriod($event));
    });
    ɵɵtemplate(2, NgxMatTimepickerFieldComponent_mat_form_field_5_mat_option_2_Template, 2, 2, "mat-option", 11);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("color", ctx_r2.color);
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r2.disabled || ctx_r2.isChangePeriodDisabled)("ngModel", ctx_r2.period);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r2.periods);
  }
}
function NgxMatTimepickerFieldComponent_ngx_mat_timepicker_toggle_6_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMatTimepickerFieldComponent_ngx_mat_timepicker_toggle_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ngx-mat-timepicker-toggle", 13)(1, "span", 14);
    ɵɵtemplate(2, NgxMatTimepickerFieldComponent_ngx_mat_timepicker_toggle_6_ng_container_2_Template, 1, 0, "ng-container", 15);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    const timepicker_r5 = ɵɵreference(8);
    const defaultIcon_r6 = ɵɵreference(10);
    ɵɵproperty("for", timepicker_r5)("disabled", ctx_r2.disabled);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r2.toggleIcon || defaultIcon_r6);
  }
}
function NgxMatTimepickerFieldComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-icon");
    ɵɵtext(1, "watch_later");
    ɵɵelementEnd();
  }
}
var NgxMatTimepickerFormat;
(function(NgxMatTimepickerFormat2) {
  NgxMatTimepickerFormat2["TWELVE"] = "hh:mm a";
  NgxMatTimepickerFormat2["TWELVE_SHORT"] = "h:m a";
  NgxMatTimepickerFormat2["TWENTY_FOUR"] = "HH:mm";
  NgxMatTimepickerFormat2["TWENTY_FOUR_SHORT"] = "H:m";
})(NgxMatTimepickerFormat || (NgxMatTimepickerFormat = {}));
var NgxMatTimepickerPeriods;
(function(NgxMatTimepickerPeriods2) {
  NgxMatTimepickerPeriods2["AM"] = "AM";
  NgxMatTimepickerPeriods2["PM"] = "PM";
})(NgxMatTimepickerPeriods || (NgxMatTimepickerPeriods = {}));
var NgxMatTimepickerAdapter = class {
  static {
    this.defaultFormat = 12;
  }
  static {
    this.defaultLocale = "en-US";
  }
  static {
    this.defaultNumberingSystem = "latn";
  }
  /***
   *  Format hour according to time format (12 or 24)
   */
  static formatHour(currentHour, format, period) {
    if (this.isTwentyFour(format)) {
      return currentHour;
    }
    const hour = period === NgxMatTimepickerPeriods.AM ? currentHour : currentHour + 12;
    if (period === NgxMatTimepickerPeriods.AM && hour === 12) {
      return 0;
    } else if (period === NgxMatTimepickerPeriods.PM && hour === 24) {
      return 12;
    }
    return hour;
  }
  static formatTime(time, opts) {
    if (!time) {
      return "Invalid Time";
    }
    const parsedTime = this.parseTime(time, opts).setLocale(this.defaultLocale);
    if (!parsedTime.isValid) {
      return "Invalid time";
    }
    const isTwelve = !this.isTwentyFour(opts.format);
    if (isTwelve) {
      return parsedTime.toLocaleString(__spreadProps(__spreadValues({}, import_ts_luxon.DateTime.TIME_SIMPLE), {
        hour12: isTwelve
      })).replace(/\u200E/g, "");
    }
    return parsedTime.toISOTime({
      includeOffset: false,
      suppressMilliseconds: true,
      suppressSeconds: true
    }).replace(/\u200E/g, "");
  }
  static fromDateTimeToString(time, format) {
    return time.reconfigure({
      numberingSystem: this.defaultNumberingSystem,
      locale: this.defaultLocale
    }).toFormat(this.isTwentyFour(format) ? NgxMatTimepickerFormat.TWENTY_FOUR : NgxMatTimepickerFormat.TWELVE);
  }
  static isBetween(time, before, after, unit = "minutes") {
    const innerUnit = unit === "hours" ? unit : void 0;
    return this.isSameOrBefore(time, after, innerUnit) && this.isSameOrAfter(time, before, innerUnit);
  }
  static isSameOrAfter(time, compareWith, unit = "minutes") {
    if (unit === "hours") {
      return time.hour >= compareWith.hour;
    }
    return time.hasSame(compareWith, unit) || time.valueOf() > compareWith.valueOf();
  }
  static isSameOrBefore(time, compareWith, unit = "minutes") {
    if (unit === "hours") {
      return time.hour <= compareWith.hour;
    }
    return time.hasSame(compareWith, unit) || time.valueOf() <= compareWith.valueOf();
  }
  static isTimeAvailable(time, min, max, granularity, minutesGap, format) {
    if (!time) {
      return void 0;
    }
    const convertedTime = this.parseTime(time, {
      format
    });
    const minutes = convertedTime.minute;
    if (minutesGap && minutes === minutes && minutes % minutesGap !== 0) {
      throw new Error(`Your minutes - ${minutes} doesn't match your minutesGap - ${minutesGap}`);
    }
    const isAfter = min && !max && this.isSameOrAfter(convertedTime, min, granularity);
    const isBefore = max && !min && this.isSameOrBefore(convertedTime, max, granularity);
    const between = min && max && this.isBetween(convertedTime, min, max, granularity);
    const isAvailable = !min && !max;
    return isAfter || isBefore || between || isAvailable;
  }
  static isTwentyFour(format) {
    return format === 24;
  }
  static parseTime(time, opts) {
    const localeOpts = this._getLocaleOptionsByTime(time, opts);
    let timeMask = NgxMatTimepickerFormat.TWENTY_FOUR_SHORT;
    if (time.match(/\s/g)) {
      time = time.replace(/\.\s*/g, "");
      timeMask = NgxMatTimepickerFormat.TWELVE_SHORT;
    }
    return import_ts_luxon.DateTime.fromFormat(time.replace(/\s+/g, " "), timeMask, {
      numberingSystem: localeOpts.numberingSystem,
      locale: localeOpts.locale
    });
  }
  static toLocaleTimeString(time, opts = {}) {
    const {
      format = this.defaultFormat,
      locale = this.defaultLocale
    } = opts;
    let hourCycle = "h12";
    let timeMask = NgxMatTimepickerFormat.TWELVE_SHORT;
    if (this.isTwentyFour(format)) {
      hourCycle = "h23";
      timeMask = NgxMatTimepickerFormat.TWENTY_FOUR_SHORT;
    }
    return import_ts_luxon.DateTime.fromFormat(time, timeMask).reconfigure({
      locale,
      numberingSystem: opts.numberingSystem,
      defaultToEN: opts.defaultToEN,
      outputCalendar: opts.outputCalendar
    }).toLocaleString(__spreadProps(__spreadValues({}, import_ts_luxon.DateTime.TIME_SIMPLE), {
      hourCycle
    }));
  }
  /**
   *
   * @param time
   * @param opts
   * @private
   */
  static _getLocaleOptionsByTime(time, opts) {
    const {
      numberingSystem,
      locale
    } = import_ts_luxon.DateTime.now().reconfigure({
      locale: opts.locale,
      numberingSystem: opts.numberingSystem,
      outputCalendar: opts.outputCalendar,
      defaultToEN: opts.defaultToEN
    }).resolvedLocaleOptions();
    return isNaN(parseInt(time, 10)) ? {
      numberingSystem,
      locale
    } : {
      numberingSystem: this.defaultNumberingSystem,
      locale: this.defaultLocale
    };
  }
};
var NgxMatTimepickerUnits;
(function(NgxMatTimepickerUnits2) {
  NgxMatTimepickerUnits2[NgxMatTimepickerUnits2["HOUR"] = 0] = "HOUR";
  NgxMatTimepickerUnits2[NgxMatTimepickerUnits2["MINUTE"] = 1] = "MINUTE";
})(NgxMatTimepickerUnits || (NgxMatTimepickerUnits = {}));
var NGX_MAT_TIMEPICKER_CONFIG = new InjectionToken("NGX_MAT_TIMEPICKER_CONFIG");
var DEFAULT_HOUR = {
  time: 12,
  angle: 360
};
var DEFAULT_MINUTE = {
  time: 0,
  angle: 360
};
var NgxMatTimepickerService = class _NgxMatTimepickerService {
  constructor() {
    this._hour$ = new BehaviorSubject(DEFAULT_HOUR);
    this._minute$ = new BehaviorSubject(DEFAULT_MINUTE);
    this._period$ = new BehaviorSubject(NgxMatTimepickerPeriods.AM);
  }
  set hour(hour) {
    this._hour$.next(hour);
  }
  set minute(minute) {
    this._minute$.next(minute);
  }
  set period(period) {
    const isPeriodValid = period === NgxMatTimepickerPeriods.AM || period === NgxMatTimepickerPeriods.PM;
    if (isPeriodValid) {
      this._period$.next(period);
    }
  }
  get selectedHour() {
    return this._hour$.asObservable();
  }
  get selectedMinute() {
    return this._minute$.asObservable();
  }
  get selectedPeriod() {
    return this._period$.asObservable();
  }
  getFullTime(format) {
    const selectedHour = this._hour$.getValue().time;
    const selectedMinute = this._minute$.getValue().time;
    const hour = selectedHour != null ? selectedHour : DEFAULT_HOUR.time;
    const minute = selectedMinute != null ? selectedMinute : DEFAULT_MINUTE.time;
    const period = format === 12 ? this._period$.getValue() : "";
    const time = `${hour}:${minute} ${period}`.trim();
    return NgxMatTimepickerAdapter.formatTime(time, {
      format
    });
  }
  setDefaultTimeIfAvailable(time, min, max, format, minutesGap) {
    time || this._resetTime();
    try {
      if (NgxMatTimepickerAdapter.isTimeAvailable(time, min, max, "minutes", minutesGap)) {
        this._setDefaultTime(time, format);
      }
    } catch (e) {
      console.error(e);
    }
  }
  _resetTime() {
    this.hour = __spreadValues({}, DEFAULT_HOUR);
    this.minute = __spreadValues({}, DEFAULT_MINUTE);
    this.period = NgxMatTimepickerPeriods.AM;
  }
  _setDefaultTime(time, format) {
    const defaultDto = NgxMatTimepickerAdapter.parseTime(time, {
      format
    });
    if (defaultDto.isValid) {
      const period = time.substring(time.length - 2).toUpperCase();
      const hour = defaultDto.hour;
      this.hour = __spreadProps(__spreadValues({}, DEFAULT_HOUR), {
        time: formatHourByPeriod(hour, period)
      });
      this.minute = __spreadProps(__spreadValues({}, DEFAULT_MINUTE), {
        time: defaultDto.minute
      });
      this.period = period;
    } else {
      this._resetTime();
    }
  }
  static {
    this.ɵfac = function NgxMatTimepickerService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _NgxMatTimepickerService,
      factory: _NgxMatTimepickerService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function formatHourByPeriod(hour, period) {
  switch (period) {
    case NgxMatTimepickerPeriods.AM:
      return hour === 0 ? 12 : hour;
    case NgxMatTimepickerPeriods.PM:
      return hour === 12 ? 12 : hour - 12;
    default:
      return hour;
  }
}
var NgxMatTimepickerEventService = class _NgxMatTimepickerEventService {
  get backdropClick() {
    return this._backdropClick$.asObservable().pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }
  get keydownEvent() {
    return this._keydownEvent$.asObservable().pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }
  constructor() {
    this._backdropClick$ = new Subject();
    this._keydownEvent$ = new Subject();
  }
  dispatchEvent(event) {
    switch (event.type) {
      case "click":
        this._backdropClick$.next(event);
        break;
      case "keydown":
        this._keydownEvent$.next(event);
        break;
      default:
        throw new Error("no such event type");
    }
  }
  static {
    this.ɵfac = function NgxMatTimepickerEventService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerEventService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _NgxMatTimepickerEventService,
      factory: _NgxMatTimepickerEventService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerEventService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var NGX_MAT_TIMEPICKER_LOCALE = new InjectionToken("TimeLocale", {
  providedIn: "root",
  factory: () => NgxMatTimepickerAdapter.defaultLocale
});
var NgxMatTimepickerLocaleService = class _NgxMatTimepickerLocaleService {
  get locale() {
    return this._locale;
  }
  constructor(initialLocale) {
    this._locale = initialLocale;
  }
  updateLocale(newValue) {
    this._locale = newValue || this._initialLocale;
  }
  static {
    this.ɵfac = function NgxMatTimepickerLocaleService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerLocaleService)(ɵɵinject(NGX_MAT_TIMEPICKER_LOCALE));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _NgxMatTimepickerLocaleService,
      factory: _NgxMatTimepickerLocaleService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerLocaleService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [NGX_MAT_TIMEPICKER_LOCALE]
    }]
  }], null);
})();
var NgxMatTimepickerBaseDirective = class _NgxMatTimepickerBaseDirective {
  set color(newValue) {
    this._color = newValue;
  }
  get color() {
    return this._color;
  }
  get defaultTime() {
    return this._defaultTime;
  }
  set defaultTime(time) {
    this._defaultTime = time;
    this._setDefaultTime(time);
  }
  get _locale() {
    return this._timepickerLocaleSrv.locale;
  }
  constructor(_timepickerSrv, _eventSrv, _timepickerLocaleSrv, data) {
    this._timepickerSrv = _timepickerSrv;
    this._eventSrv = _eventSrv;
    this._timepickerLocaleSrv = _timepickerLocaleSrv;
    this.data = data;
    this.activeTimeUnit = NgxMatTimepickerUnits.HOUR;
    this.timeUnit = NgxMatTimepickerUnits;
    this._color = "primary";
    this._subsCtrl$ = new Subject();
    this.color = data.color;
    this.defaultTime = data.defaultTime;
  }
  changePeriod(period) {
    this._timepickerSrv.period = period;
    this._onTimeChange();
  }
  changeTimeUnit(unit) {
    this.activeTimeUnit = unit;
  }
  close() {
    this.data.timepickerBaseRef.close();
  }
  ngOnDestroy() {
    this._subsCtrl$.next();
    this._subsCtrl$.complete();
  }
  ngOnInit() {
    this._defineTime();
    this.selectedHour = this._timepickerSrv.selectedHour.pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
    this.selectedMinute = this._timepickerSrv.selectedMinute.pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
    this.selectedPeriod = this._timepickerSrv.selectedPeriod.pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
    this.data.timepickerBaseRef.timeUpdated.pipe(takeUntil(this._subsCtrl$)).subscribe({
      next: (v) => {
        v && this._setDefaultTime(v);
      }
    });
  }
  onHourChange(hour) {
    this._timepickerSrv.hour = hour;
    this._onTimeChange();
  }
  onHourSelected(hour) {
    if (!this.data.hoursOnly) {
      this.changeTimeUnit(NgxMatTimepickerUnits.MINUTE);
    }
    this.data.timepickerBaseRef.hourSelected.next(hour);
  }
  onKeydown(e) {
    this._eventSrv.dispatchEvent(e);
    e.stopPropagation();
  }
  onMinuteChange(minute) {
    this._timepickerSrv.minute = minute;
    this._onTimeChange();
  }
  setTime() {
    this.data.timepickerBaseRef.timeSet.emit(this._timepickerSrv.getFullTime(this.data.format));
    this.close();
  }
  _defineTime() {
    const minTime = this.data.minTime;
    if (minTime && !this.data.time && !this.data.defaultTime) {
      const time = NgxMatTimepickerAdapter.fromDateTimeToString(minTime, this.data.format);
      this._setDefaultTime(time);
    }
  }
  _onTimeChange() {
    const time = NgxMatTimepickerAdapter.toLocaleTimeString(this._timepickerSrv.getFullTime(this.data.format), {
      locale: this._locale,
      format: this.data.format
    });
    this.data.timepickerBaseRef.timeChanged.emit(time);
  }
  _setDefaultTime(time) {
    this._timepickerSrv.setDefaultTimeIfAvailable(time, this.data.minTime, this.data.maxTime, this.data.format, this.data.minutesGap);
  }
  static {
    this.ɵfac = function NgxMatTimepickerBaseDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerBaseDirective)(ɵɵdirectiveInject(NgxMatTimepickerService), ɵɵdirectiveInject(NgxMatTimepickerEventService), ɵɵdirectiveInject(NgxMatTimepickerLocaleService), ɵɵdirectiveInject(NGX_MAT_TIMEPICKER_CONFIG));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NgxMatTimepickerBaseDirective,
      selectors: [["", "ngxMatTimepickerBase", ""]],
      hostBindings: function NgxMatTimepickerBaseDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("keydown", function NgxMatTimepickerBaseDirective_keydown_HostBindingHandler($event) {
            return ctx.onKeydown($event);
          });
        }
      },
      inputs: {
        color: "color",
        defaultTime: "defaultTime"
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerBaseDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxMatTimepickerBase]",
      standalone: true
    }]
  }], () => [{
    type: NgxMatTimepickerService
  }, {
    type: NgxMatTimepickerEventService
  }, {
    type: NgxMatTimepickerLocaleService
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [NGX_MAT_TIMEPICKER_CONFIG]
    }]
  }], {
    color: [{
      type: Input
    }],
    defaultTime: [{
      type: Input
    }],
    onKeydown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var NgxMatTimepickerUtils = class {
  static get DEFAULT_MINUTES_GAP() {
    return 5;
  }
  static disableHours(hours, config2) {
    if (config2.min || config2.max) {
      return hours.map((value) => {
        const hour = NgxMatTimepickerAdapter.isTwentyFour(config2.format) ? value.time : NgxMatTimepickerAdapter.formatHour(value.time, config2.format, config2.period);
        const currentTime = import_ts_luxon.DateTime.fromObject({
          hour
        }).toFormat(NgxMatTimepickerFormat.TWELVE);
        return __spreadProps(__spreadValues({}, value), {
          disabled: !NgxMatTimepickerAdapter.isTimeAvailable(currentTime, config2.min, config2.max, "hours")
        });
      });
    }
    return hours;
  }
  static disableMinutes(minutes, selectedHour, config2) {
    if (config2.min || config2.max) {
      const hour = NgxMatTimepickerAdapter.formatHour(selectedHour, config2.format, config2.period);
      let currentTime = import_ts_luxon.DateTime.fromObject({
        hour,
        minute: 0
      });
      return minutes.map((value) => {
        currentTime = currentTime.set({
          minute: value.time
        });
        return __spreadProps(__spreadValues({}, value), {
          disabled: !NgxMatTimepickerAdapter.isTimeAvailable(currentTime.toFormat(NgxMatTimepickerFormat.TWELVE), config2.min, config2.max, "minutes")
        });
      });
    }
    return minutes;
  }
  static getHours(format) {
    return Array(format).fill(1).map((v, i) => {
      const angleStep = 30;
      const time = v + i;
      const angle = angleStep * time;
      return {
        time: time === 24 ? 0 : time,
        angle
      };
    });
  }
  static getMinutes(gap = 1) {
    const minutesCount = 60;
    const angleStep = 360 / minutesCount;
    const minutes = [];
    for (let i = 0; i < minutesCount; i++) {
      const angle = angleStep * i;
      if (i % gap === 0) {
        minutes.push({
          time: i,
          angle: angle !== 0 ? angle : 360
        });
      }
    }
    return minutes;
  }
  static isDigit(e) {
    if ([46, 8, 9, 27, 13].some((n) => n === e.keyCode) || // Allow: Ctrl/cmd+A
    e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true) || // Allow: Ctrl/cmd+C
    e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true) || // Allow: Ctrl/cmd+X
    e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true) || // Allow: home, end, left, right, up, down
    e.keyCode >= 35 && e.keyCode <= 40) {
      return true;
    }
    return !((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105));
  }
};
var NgxMatTimepickerMeasure;
(function(NgxMatTimepickerMeasure2) {
  NgxMatTimepickerMeasure2["hour"] = "hour";
  NgxMatTimepickerMeasure2["minute"] = "minute";
})(NgxMatTimepickerMeasure || (NgxMatTimepickerMeasure = {}));
var NgxMatTimepickerTimeLocalizerPipe = class _NgxMatTimepickerTimeLocalizerPipe {
  get _locale() {
    return this._timepickerLocaleSrv.locale;
  }
  constructor(_timepickerLocaleSrv) {
    this._timepickerLocaleSrv = _timepickerLocaleSrv;
  }
  transform(time, timeUnit, isKeyboardEnabled = false) {
    if (time == null || time === "") {
      return "";
    }
    switch (timeUnit) {
      case NgxMatTimepickerUnits.HOUR: {
        const format = time === 0 || isKeyboardEnabled ? "HH" : "H";
        return this._formatTime(NgxMatTimepickerMeasure.hour, time, format);
      }
      case NgxMatTimepickerUnits.MINUTE:
        return this._formatTime(NgxMatTimepickerMeasure.minute, time, "mm");
      default:
        throw new Error(`There is no Time Unit with type ${timeUnit}`);
    }
  }
  _formatTime(timeMeasure, time, format) {
    try {
      return import_ts_luxon.DateTime.fromObject({
        [timeMeasure]: +time
      }).setLocale(this._locale).toFormat(format);
    } catch {
      throw new Error(`Cannot format provided time - ${time} to locale - ${this._locale}`);
    }
  }
  static {
    this.ɵfac = function NgxMatTimepickerTimeLocalizerPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerTimeLocalizerPipe)(ɵɵdirectiveInject(NgxMatTimepickerLocaleService, 16));
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "timeLocalizer",
      type: _NgxMatTimepickerTimeLocalizerPipe,
      pure: true,
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerTimeLocalizerPipe, [{
    type: Pipe,
    args: [{
      name: "timeLocalizer",
      standalone: true
    }]
  }], () => [{
    type: NgxMatTimepickerLocaleService
  }], null);
})();
var NgxMatTimepickerMinutesFormatterPipe = class _NgxMatTimepickerMinutesFormatterPipe {
  transform(minute, gap = NgxMatTimepickerUtils.DEFAULT_MINUTES_GAP) {
    if (!minute) {
      return minute;
    }
    return minute % gap === 0 ? minute : "";
  }
  static {
    this.ɵfac = function NgxMatTimepickerMinutesFormatterPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerMinutesFormatterPipe)();
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "minutesFormatter",
      type: _NgxMatTimepickerMinutesFormatterPipe,
      pure: true,
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerMinutesFormatterPipe, [{
    type: Pipe,
    args: [{
      name: "minutesFormatter",
      standalone: true
    }]
  }], null, null);
})();
var NgxMatTimepickerActiveMinutePipe = class _NgxMatTimepickerActiveMinutePipe {
  transform(minute, currentMinute, gap, isClockFaceDisabled) {
    if (minute == null || isClockFaceDisabled) {
      return false;
    }
    return currentMinute === minute && minute % (gap || NgxMatTimepickerUtils.DEFAULT_MINUTES_GAP) === 0;
  }
  static {
    this.ɵfac = function NgxMatTimepickerActiveMinutePipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerActiveMinutePipe)();
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "activeMinute",
      type: _NgxMatTimepickerActiveMinutePipe,
      pure: true,
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerActiveMinutePipe, [{
    type: Pipe,
    args: [{
      name: "activeMinute",
      standalone: true
    }]
  }], null, null);
})();
var NgxMatTimepickerActiveHourPipe = class _NgxMatTimepickerActiveHourPipe {
  transform(hour, currentHour, isClockFaceDisabled) {
    if (hour == null || isClockFaceDisabled) {
      return false;
    }
    return hour === currentHour;
  }
  static {
    this.ɵfac = function NgxMatTimepickerActiveHourPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerActiveHourPipe)();
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "activeHour",
      type: _NgxMatTimepickerActiveHourPipe,
      pure: true,
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerActiveHourPipe, [{
    type: Pipe,
    args: [{
      name: "activeHour",
      standalone: true
    }]
  }], null, null);
})();
function roundAngle(angle, step) {
  return Math.round(angle / step) * step;
}
function countAngleByCords(x0, y0, x, y, currentAngle) {
  if (y > y0 && x >= x0) {
    return 180 - currentAngle;
  } else if (y > y0 && x < x0) {
    return 180 + currentAngle;
  } else if (y < y0 && x < x0) {
    return 360 - currentAngle;
  } else {
    return currentAngle;
  }
}
var CLOCK_HAND_STYLES = {
  small: {
    height: "75px",
    top: "calc(50% - 75px)"
  },
  large: {
    height: "103px",
    top: "calc(50% - 103px)"
  }
};
var NgxMatTimepickerFaceComponent = class _NgxMatTimepickerFaceComponent {
  constructor() {
    this.color = "primary";
    this.innerClockFaceSize = 85;
    this.timeChange = new EventEmitter();
    this.timeSelected = new EventEmitter();
    this.timeUnit = NgxMatTimepickerUnits;
  }
  ngAfterViewInit() {
    this._setClockHandPosition();
    this._addTouchEvents();
  }
  ngOnChanges(changes) {
    const faceTimeChanges = changes["faceTime"];
    const selectedTimeChanges = changes["selectedTime"];
    if (faceTimeChanges && faceTimeChanges.currentValue && selectedTimeChanges && selectedTimeChanges.currentValue) {
      this.selectedTime = this.faceTime.find((time) => time.time === this.selectedTime.time);
    }
    if (selectedTimeChanges && selectedTimeChanges.currentValue) {
      this._setClockHandPosition();
    }
    if (faceTimeChanges && faceTimeChanges.currentValue) {
      setTimeout(() => this._selectAvailableTime());
    }
  }
  ngOnDestroy() {
    this._removeTouchEvents();
  }
  onMousedown(e) {
    e.preventDefault();
    this._isStarted = true;
  }
  onMouseup(e) {
    e.preventDefault();
    this._isStarted = false;
  }
  selectTime(e) {
    if (!this._isStarted && e instanceof MouseEvent && e.type !== "click") {
      return;
    }
    const clockFaceCords = this.clockFace.nativeElement.getBoundingClientRect();
    const centerX = clockFaceCords.left + clockFaceCords.width / 2;
    const centerY = clockFaceCords.top + clockFaceCords.height / 2;
    const arctangent = Math.atan(Math.abs(e.clientX - centerX) / Math.abs(e.clientY - centerY)) * 180 / Math.PI;
    const circleAngle = countAngleByCords(centerX, centerY, e.clientX, e.clientY, arctangent);
    const isInnerClockChosen = this.format && this._isInnerClockFace(centerX, centerY, e.clientX, e.clientY);
    const angleStep = this.unit === NgxMatTimepickerUnits.MINUTE ? 6 * (this.minutesGap || 1) : 30;
    const roundedAngle = roundAngle(circleAngle, angleStep);
    const angle = (roundedAngle || 360) + (isInnerClockChosen ? 360 : 0);
    const selectedTime = this.faceTime.find((val) => val.angle === angle);
    if (selectedTime && !selectedTime.disabled) {
      this.timeChange.next(selectedTime);
      if (!this._isStarted) {
        this.timeSelected.next(selectedTime.time);
      }
    }
  }
  trackByTime(_item_, time) {
    return time.time;
  }
  _addTouchEvents() {
    this._touchStartHandler = this.onMousedown.bind(this);
    this._touchEndHandler = this.onMouseup.bind(this);
    this.clockFace.nativeElement.addEventListener("touchstart", this._touchStartHandler);
    this.clockFace.nativeElement.addEventListener("touchend", this._touchEndHandler);
  }
  _decreaseClockHand() {
    this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.small.height;
    this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.small.top;
  }
  _increaseClockHand() {
    this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.large.height;
    this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.large.top;
  }
  _isInnerClockFace(x0, y0, x, y) {
    return Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)) < this.innerClockFaceSize;
  }
  _removeTouchEvents() {
    this.clockFace.nativeElement.removeEventListener("touchstart", this._touchStartHandler);
    this.clockFace.nativeElement.removeEventListener("touchend", this._touchEndHandler);
  }
  _selectAvailableTime() {
    const currentTime = this.faceTime.find((time) => this.selectedTime.time === time.time);
    this.isClockFaceDisabled = this.faceTime.every((time) => time.disabled);
    if (currentTime && currentTime.disabled && !this.isClockFaceDisabled) {
      const availableTime = this.faceTime.find((time) => !time.disabled);
      this.timeChange.next(availableTime);
    }
  }
  _setClockHandPosition() {
    if (NgxMatTimepickerAdapter.isTwentyFour(this.format)) {
      if (this.selectedTime.time > 12 || this.selectedTime.time === 0) {
        this._decreaseClockHand();
      } else {
        this._increaseClockHand();
      }
    }
    if (this.selectedTime) {
      this.clockHand.nativeElement.style.transform = `rotate(${this.selectedTime.angle}deg)`;
    }
  }
  static {
    this.ɵfac = function NgxMatTimepickerFaceComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerFaceComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgxMatTimepickerFaceComponent,
      selectors: [["ngx-mat-timepicker-face"]],
      viewQuery: function NgxMatTimepickerFaceComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(_c02, 7);
          ɵɵviewQuery(_c12, 7, ElementRef);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.clockFace = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.clockHand = _t.first);
        }
      },
      hostBindings: function NgxMatTimepickerFaceComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("mousedown", function NgxMatTimepickerFaceComponent_mousedown_HostBindingHandler($event) {
            return ctx.onMousedown($event);
          })("mouseup", function NgxMatTimepickerFaceComponent_mouseup_HostBindingHandler($event) {
            return ctx.onMouseup($event);
          })("click", function NgxMatTimepickerFaceComponent_click_HostBindingHandler($event) {
            return ctx.selectTime($event);
          })("touchmove", function NgxMatTimepickerFaceComponent_touchmove_HostBindingHandler($event) {
            return ctx.selectTime($event.changedTouches[0]);
          })("touchend", function NgxMatTimepickerFaceComponent_touchend_HostBindingHandler($event) {
            return ctx.selectTime($event.changedTouches[0]);
          })("mousemove", function NgxMatTimepickerFaceComponent_mousemove_HostBindingHandler($event) {
            return ctx.selectTime($event);
          });
        }
      },
      inputs: {
        color: "color",
        dottedMinutesInGap: "dottedMinutesInGap",
        faceTime: "faceTime",
        format: "format",
        minutesGap: "minutesGap",
        selectedTime: "selectedTime",
        unit: "unit"
      },
      outputs: {
        timeChange: "timeChange",
        timeSelected: "timeSelected"
      },
      standalone: true,
      features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
      ngContentSelectors: _c2,
      decls: 11,
      vars: 9,
      consts: [["hourButton", ""], ["minutesFace", ""], ["clockFace", ""], ["clockHand", ""], ["current", ""], [1, "clock-face"], ["class", "clock-face__container", 4, "ngIf", "ngIfElse"], [1, "clock-face__clock-hand", 3, "color", "ngClass", "hidden"], ["mat-mini-fab", "", 3, "color", 4, "ngIf"], [1, "clock-face__center", 3, "color"], ["mat-mini-fab", "", "disableRipple", "", 1, "mat-elevation-z0", 3, "color", "ngStyle", "disabled"], [1, "clock-face__container"], ["class", "clock-face__number clock-face__number--outer", 3, "ngStyle", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "clock-face__number", "clock-face__number--outer", 3, "ngStyle"], ["type", "hidden", 3, "value"], ["class", "clock-face__inner", 4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "clock-face__inner"], ["class", "clock-face__number clock-face__number--inner", 3, "top", "ngStyle", "height", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "clock-face__number", "clock-face__number--inner", 3, "ngStyle"], ["mat-mini-fab", "", 3, "color"], [1, "clock-face__clock-hand_minute_dot"]],
      template: function NgxMatTimepickerFaceComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef(_c2);
          ɵɵtemplate(0, NgxMatTimepickerFaceComponent_ng_template_0_Template, 4, 13, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, NgxMatTimepickerFaceComponent_ng_template_2_Template, 2, 2, "ng-template", null, 1, ɵɵtemplateRefExtractor);
          ɵɵelementStart(4, "div", 5, 2);
          ɵɵtemplate(6, NgxMatTimepickerFaceComponent_div_6_Template, 4, 7, "div", 6);
          ɵɵelementStart(7, "mat-toolbar", 7, 3);
          ɵɵtemplate(9, NgxMatTimepickerFaceComponent_button_9_Template, 2, 1, "button", 8);
          ɵɵelementEnd();
          ɵɵelement(10, "mat-toolbar", 9);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          const minutesFace_r8 = ɵɵreference(3);
          ɵɵadvance(6);
          ɵɵproperty("ngIf", ctx.unit !== ctx.timeUnit.MINUTE)("ngIfElse", minutesFace_r8);
          ɵɵadvance();
          ɵɵproperty("color", ctx.color)("ngClass", ɵɵpureFunction1(7, _c3, ctx.unit === ctx.timeUnit.MINUTE))("hidden", ctx.isClockFaceDisabled);
          ɵɵadvance(2);
          ɵɵproperty("ngIf", ctx.unit === ctx.timeUnit.MINUTE);
          ɵɵadvance();
          ɵɵproperty("color", ctx.color);
        }
      },
      dependencies: [MatButtonModule, MatMiniFabButton, NgStyle, NgForOf, NgIf, NgTemplateOutlet, MatToolbarModule, MatToolbar, NgClass, SlicePipe, NgxMatTimepickerActiveHourPipe, NgxMatTimepickerActiveMinutePipe, NgxMatTimepickerMinutesFormatterPipe, NgxMatTimepickerTimeLocalizerPipe],
      styles: ['ngx-mat-timepicker-face [mat-mini-fab].mat-unthemed{--mdc-fab-small-container-color: transparent;--mat-fab-small-disabled-state-container-color: transparent;--mat-fab-hover-state-layer-opacity: 0;box-shadow:none}ngx-mat-timepicker-face [mat-mini-fab].mat-unthemed .mat-mdc-button-persistent-ripple{display:none}ngx-mat-timepicker-face [mat-mini-fab].mat-unthemed.dot{position:relative}ngx-mat-timepicker-face [mat-mini-fab].mat-unthemed.dot:after{content:" ";background-color:#777;width:3px;height:3px;border-radius:50%;left:50%;top:50%;position:absolute;transform:translate(-50%,-50%)}ngx-mat-timepicker-face .clock-face{width:290px;height:290px;border-radius:50%;position:relative;display:flex;justify-content:center;box-sizing:border-box;background-color:#c8c8c880!important}ngx-mat-timepicker-face .clock-face__inner{position:absolute;top:0;left:0;width:100%;height:100%}ngx-mat-timepicker-face .clock-face [mat-mini-fab].mat-void{box-shadow:none;background-color:transparent}ngx-mat-timepicker-face .clock-face [mat-mini-fab].mat-void>span.mat-mdc-button-persistent-ripple{display:none}ngx-mat-timepicker-face .clock-face__container{margin-left:-2px}ngx-mat-timepicker-face .clock-face__number{position:absolute;transform-origin:25px 100%;width:50px;text-align:center;z-index:2;top:calc(50% - 125px);left:calc(50% - 25px)}ngx-mat-timepicker-face .clock-face__number--outer{height:125px}ngx-mat-timepicker-face .clock-face__number--outer>span{font-size:16px}ngx-mat-timepicker-face .clock-face__number--inner>span{font-size:14px}ngx-mat-timepicker-face .clock-face__clock-hand{height:103px;width:2px;padding:0;transform-origin:1px 100%;position:absolute;top:calc(50% - 103px);z-index:1}ngx-mat-timepicker-face .clock-face__center{width:8px;height:8px;padding:0;position:absolute;border-radius:50%;top:50%;left:50%;margin:-4px}ngx-mat-timepicker-face .clock-face__clock-hand_minute>button{position:absolute;top:-22px;left:calc(50% - 20px);box-sizing:content-box;display:flex;justify-content:center;align-items:center}ngx-mat-timepicker-face .clock-face__clock-hand_minute>button .clock-face__clock-hand_minute_dot{display:block;width:4px;height:4px;background:#fff;border-radius:50%}@media (max-device-width: 1023px) and (orientation: landscape){ngx-mat-timepicker-face .clock-face{width:250px;height:250px}}@media screen and (max-width: 360px){ngx-mat-timepicker-face .clock-face{width:250px;height:250px}}\n'],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerFaceComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-face",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      imports: [MatButtonModule, NgStyle, NgForOf, NgIf, NgTemplateOutlet, MatToolbarModule, NgClass, SlicePipe, NgxMatTimepickerActiveHourPipe, NgxMatTimepickerActiveMinutePipe, NgxMatTimepickerMinutesFormatterPipe, NgxMatTimepickerTimeLocalizerPipe],
      template: `<!-- DEFAULT TEMPLATES - START -->
<ng-template #hourButton
             let-time>
    <button mat-mini-fab
            disableRipple
            class="mat-elevation-z0"
            [color]="(time.time | activeHour: selectedTime?.time : isClockFaceDisabled) ? color : undefined"
            [ngStyle]="{'transform': 'rotateZ(-'+ time.angle +'deg)'}"
            [disabled]="time.disabled">
        {{time.time | timeLocalizer: timeUnit.HOUR}}
    </button>
</ng-template>
<ng-template #minutesFace>
    <div class="clock-face__container">
        <div class="clock-face__number clock-face__number--outer"
             [ngStyle]="{'transform': 'rotateZ('+ time.angle +'deg)'}"
             *ngFor="let time of faceTime; trackBy: trackByTime">
			<input #current
				   type="hidden"
				   [value]="time.time | minutesFormatter: minutesGap | timeLocalizer: timeUnit.MINUTE" />
            <button mat-mini-fab
                    disableRipple
                    class="mat-elevation-z0"
					[class.dot]="dottedMinutesInGap && current.value === '' && !(time.time | activeMinute: selectedTime?.time:1:isClockFaceDisabled)"
                    [color]="(time.time | activeMinute: selectedTime?.time:minutesGap:isClockFaceDisabled) ? color : undefined"
                    [ngStyle]="{'transform': 'rotateZ(-'+ time.angle +'deg)'}"
                    [disabled]="time.disabled">
                {{current.value}}
            </button>
        </div>
    </div>
</ng-template>
<!-- DEFAULT TEMPLATES - END -->
<div class="clock-face"
     #clockFace>
    <div *ngIf="unit !== timeUnit.MINUTE;else minutesFace"
         class="clock-face__container">
        <div class="clock-face__number clock-face__number--outer"
             [ngStyle]="{'transform': 'rotateZ('+ time.angle +'deg)'}"
             *ngFor="let time of faceTime | slice: 0 : 12; trackBy: trackByTime">
            <ng-content *ngTemplateOutlet="hourButton; context: {$implicit: time}"></ng-content>
        </div>
        <div class="clock-face__inner"
             *ngIf="faceTime.length > 12">
            <div class="clock-face__number clock-face__number--inner"
                 [style.top]="'calc(50% - ' + innerClockFaceSize + 'px)'"
                 [ngStyle]="{'transform': 'rotateZ('+ time.angle +'deg)'}"
                 [style.height.px]="innerClockFaceSize"
                 *ngFor="let time of faceTime | slice: 12 : 24; trackBy: trackByTime">
                <ng-content *ngTemplateOutlet="hourButton; context: {$implicit: time}"></ng-content>
            </div>
        </div>
    </div>
    <mat-toolbar class="clock-face__clock-hand"
                 [color]="color"
                 [ngClass]="{'clock-face__clock-hand_minute': unit === timeUnit.MINUTE}"
                 #clockHand
                 [hidden]="isClockFaceDisabled">
        <button mat-mini-fab
                *ngIf="unit === timeUnit.MINUTE"
                [color]="color">
            <span class="clock-face__clock-hand_minute_dot"></span>
        </button>
    </mat-toolbar>
    <mat-toolbar class="clock-face__center"
                 [color]="color"></mat-toolbar>
</div>
`,
      styles: ['ngx-mat-timepicker-face [mat-mini-fab].mat-unthemed{--mdc-fab-small-container-color: transparent;--mat-fab-small-disabled-state-container-color: transparent;--mat-fab-hover-state-layer-opacity: 0;box-shadow:none}ngx-mat-timepicker-face [mat-mini-fab].mat-unthemed .mat-mdc-button-persistent-ripple{display:none}ngx-mat-timepicker-face [mat-mini-fab].mat-unthemed.dot{position:relative}ngx-mat-timepicker-face [mat-mini-fab].mat-unthemed.dot:after{content:" ";background-color:#777;width:3px;height:3px;border-radius:50%;left:50%;top:50%;position:absolute;transform:translate(-50%,-50%)}ngx-mat-timepicker-face .clock-face{width:290px;height:290px;border-radius:50%;position:relative;display:flex;justify-content:center;box-sizing:border-box;background-color:#c8c8c880!important}ngx-mat-timepicker-face .clock-face__inner{position:absolute;top:0;left:0;width:100%;height:100%}ngx-mat-timepicker-face .clock-face [mat-mini-fab].mat-void{box-shadow:none;background-color:transparent}ngx-mat-timepicker-face .clock-face [mat-mini-fab].mat-void>span.mat-mdc-button-persistent-ripple{display:none}ngx-mat-timepicker-face .clock-face__container{margin-left:-2px}ngx-mat-timepicker-face .clock-face__number{position:absolute;transform-origin:25px 100%;width:50px;text-align:center;z-index:2;top:calc(50% - 125px);left:calc(50% - 25px)}ngx-mat-timepicker-face .clock-face__number--outer{height:125px}ngx-mat-timepicker-face .clock-face__number--outer>span{font-size:16px}ngx-mat-timepicker-face .clock-face__number--inner>span{font-size:14px}ngx-mat-timepicker-face .clock-face__clock-hand{height:103px;width:2px;padding:0;transform-origin:1px 100%;position:absolute;top:calc(50% - 103px);z-index:1}ngx-mat-timepicker-face .clock-face__center{width:8px;height:8px;padding:0;position:absolute;border-radius:50%;top:50%;left:50%;margin:-4px}ngx-mat-timepicker-face .clock-face__clock-hand_minute>button{position:absolute;top:-22px;left:calc(50% - 20px);box-sizing:content-box;display:flex;justify-content:center;align-items:center}ngx-mat-timepicker-face .clock-face__clock-hand_minute>button .clock-face__clock-hand_minute_dot{display:block;width:4px;height:4px;background:#fff;border-radius:50%}@media (max-device-width: 1023px) and (orientation: landscape){ngx-mat-timepicker-face .clock-face{width:250px;height:250px}}@media screen and (max-width: 360px){ngx-mat-timepicker-face .clock-face{width:250px;height:250px}}\n']
    }]
  }], null, {
    clockFace: [{
      type: ViewChild,
      args: ["clockFace", {
        static: true
      }]
    }],
    clockHand: [{
      type: ViewChild,
      args: ["clockHand", {
        static: true,
        read: ElementRef
      }]
    }],
    color: [{
      type: Input
    }],
    dottedMinutesInGap: [{
      type: Input
    }],
    faceTime: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    minutesGap: [{
      type: Input
    }],
    selectedTime: [{
      type: Input
    }],
    timeChange: [{
      type: Output
    }],
    timeSelected: [{
      type: Output
    }],
    unit: [{
      type: Input
    }],
    onMousedown: [{
      type: HostListener,
      args: ["mousedown", ["$event"]]
    }],
    onMouseup: [{
      type: HostListener,
      args: ["mouseup", ["$event"]]
    }],
    selectTime: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }, {
      type: HostListener,
      args: ["touchmove", ["$event.changedTouches[0]"]]
    }, {
      type: HostListener,
      args: ["touchend", ["$event.changedTouches[0]"]]
    }, {
      type: HostListener,
      args: ["mousemove", ["$event"]]
    }]
  });
})();
var NgxMatTimepickerMinutesFaceComponent = class _NgxMatTimepickerMinutesFaceComponent {
  set color(newValue) {
    this._color = newValue;
  }
  get color() {
    return this._color;
  }
  constructor() {
    this.minuteChange = new EventEmitter();
    this.minutesList = [];
    this.timeUnit = NgxMatTimepickerUnits;
    this._color = "primary";
  }
  ngOnChanges(changes) {
    if (changes["period"] && changes["period"].currentValue) {
      const minutes = NgxMatTimepickerUtils.getMinutes(this.minutesGap);
      this.minutesList = NgxMatTimepickerUtils.disableMinutes(minutes, this.selectedHour, {
        min: this.minTime,
        max: this.maxTime,
        format: this.format,
        period: this.period
      });
    }
  }
  static {
    this.ɵfac = function NgxMatTimepickerMinutesFaceComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerMinutesFaceComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgxMatTimepickerMinutesFaceComponent,
      selectors: [["ngx-mat-timepicker-minutes-face"]],
      inputs: {
        color: "color",
        dottedMinutesInGap: "dottedMinutesInGap",
        format: "format",
        maxTime: "maxTime",
        minTime: "minTime",
        minutesGap: "minutesGap",
        period: "period",
        selectedHour: "selectedHour",
        selectedMinute: "selectedMinute"
      },
      outputs: {
        minuteChange: "minuteChange"
      },
      standalone: true,
      features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
      decls: 1,
      vars: 6,
      consts: [[3, "timeChange", "color", "dottedMinutesInGap", "faceTime", "selectedTime", "minutesGap", "unit"]],
      template: function NgxMatTimepickerMinutesFaceComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "ngx-mat-timepicker-face", 0);
          ɵɵlistener("timeChange", function NgxMatTimepickerMinutesFaceComponent_Template_ngx_mat_timepicker_face_timeChange_0_listener($event) {
            return ctx.minuteChange.next($event);
          });
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵproperty("color", ctx.color)("dottedMinutesInGap", ctx.dottedMinutesInGap)("faceTime", ctx.minutesList)("selectedTime", ctx.selectedMinute)("minutesGap", ctx.minutesGap)("unit", ctx.timeUnit.MINUTE);
        }
      },
      dependencies: [NgxMatTimepickerFaceComponent],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerMinutesFaceComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-minutes-face",
      imports: [NgxMatTimepickerFaceComponent],
      template: '<ngx-mat-timepicker-face [color]="color"\n						 [dottedMinutesInGap]="dottedMinutesInGap"\n						 [faceTime]="minutesList"\n						 [selectedTime]="selectedMinute"\n						 [minutesGap]="minutesGap"\n						 (timeChange)="minuteChange.next($event)"\n						 [unit]="timeUnit.MINUTE"></ngx-mat-timepicker-face>\n'
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    dottedMinutesInGap: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    maxTime: [{
      type: Input
    }],
    minTime: [{
      type: Input
    }],
    minuteChange: [{
      type: Output
    }],
    minutesGap: [{
      type: Input
    }],
    period: [{
      type: Input
    }],
    selectedHour: [{
      type: Input
    }],
    selectedMinute: [{
      type: Input
    }]
  });
})();
var NgxMatTimepickerHoursFaceDirective = class _NgxMatTimepickerHoursFaceDirective {
  set color(newValue) {
    this._color = newValue;
  }
  get color() {
    return this._color;
  }
  set format(newValue) {
    this._format = newValue;
    this.hoursList = NgxMatTimepickerUtils.getHours(this._format);
  }
  get format() {
    return this._format;
  }
  constructor() {
    this.hourChange = new EventEmitter();
    this.hourSelected = new EventEmitter();
    this.hoursList = [];
    this._color = "primary";
    this._format = 24;
  }
  onTimeSelected(time) {
    this.hourSelected.next(time);
  }
  static {
    this.ɵfac = function NgxMatTimepickerHoursFaceDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerHoursFaceDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NgxMatTimepickerHoursFaceDirective,
      selectors: [["", "ngxMatTimepickerHoursFace", ""]],
      inputs: {
        color: "color",
        format: "format",
        maxTime: "maxTime",
        minTime: "minTime",
        selectedHour: "selectedHour"
      },
      outputs: {
        hourChange: "hourChange",
        hourSelected: "hourSelected"
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerHoursFaceDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxMatTimepickerHoursFace]",
      standalone: true
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    hourChange: [{
      type: Output
    }],
    hourSelected: [{
      type: Output
    }],
    maxTime: [{
      type: Input
    }],
    minTime: [{
      type: Input
    }],
    selectedHour: [{
      type: Input
    }]
  });
})();
var NgxMatTimepicker12HoursFaceComponent = class _NgxMatTimepicker12HoursFaceComponent extends NgxMatTimepickerHoursFaceDirective {
  constructor() {
    super();
    this.format = 12;
  }
  ngOnChanges(changes) {
    if (changes["period"] && changes["period"].currentValue) {
      this.hoursList = NgxMatTimepickerUtils.disableHours(this.hoursList, {
        min: this.minTime,
        max: this.maxTime,
        format: this.format,
        period: this.period
      });
    }
  }
  static {
    this.ɵfac = function NgxMatTimepicker12HoursFaceComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepicker12HoursFaceComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgxMatTimepicker12HoursFaceComponent,
      selectors: [["ngx-mat-timepicker-12-hours-face"]],
      inputs: {
        period: "period"
      },
      standalone: true,
      features: [ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
      decls: 1,
      vars: 3,
      consts: [[3, "timeChange", "timeSelected", "color", "selectedTime", "faceTime"]],
      template: function NgxMatTimepicker12HoursFaceComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "ngx-mat-timepicker-face", 0);
          ɵɵlistener("timeChange", function NgxMatTimepicker12HoursFaceComponent_Template_ngx_mat_timepicker_face_timeChange_0_listener($event) {
            return ctx.hourChange.next($event);
          })("timeSelected", function NgxMatTimepicker12HoursFaceComponent_Template_ngx_mat_timepicker_face_timeSelected_0_listener($event) {
            return ctx.onTimeSelected($event);
          });
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵproperty("color", ctx.color)("selectedTime", ctx.selectedHour)("faceTime", ctx.hoursList);
        }
      },
      dependencies: [NgxMatTimepickerFaceComponent],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepicker12HoursFaceComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-12-hours-face",
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [NgxMatTimepickerFaceComponent],
      template: '<ngx-mat-timepicker-face [color]="color"\n                     [selectedTime]="selectedHour"\n                     [faceTime]="hoursList"\n                     (timeChange)="hourChange.next($event)"\n                     (timeSelected)="onTimeSelected($event)"></ngx-mat-timepicker-face>\n'
    }]
  }], () => [], {
    period: [{
      type: Input
    }]
  });
})();
var NgxMatTimepicker24HoursFaceComponent = class _NgxMatTimepicker24HoursFaceComponent extends NgxMatTimepickerHoursFaceDirective {
  constructor() {
    super();
    this.format = 24;
  }
  ngAfterContentInit() {
    this.hoursList = NgxMatTimepickerUtils.disableHours(this.hoursList, {
      min: this.minTime,
      max: this.maxTime,
      format: this.format
    });
  }
  static {
    this.ɵfac = function NgxMatTimepicker24HoursFaceComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepicker24HoursFaceComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgxMatTimepicker24HoursFaceComponent,
      selectors: [["ngx-mat-timepicker-24-hours-face"]],
      standalone: true,
      features: [ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
      decls: 1,
      vars: 4,
      consts: [[3, "timeChange", "timeSelected", "color", "selectedTime", "faceTime", "format"]],
      template: function NgxMatTimepicker24HoursFaceComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "ngx-mat-timepicker-face", 0);
          ɵɵlistener("timeChange", function NgxMatTimepicker24HoursFaceComponent_Template_ngx_mat_timepicker_face_timeChange_0_listener($event) {
            return ctx.hourChange.next($event);
          })("timeSelected", function NgxMatTimepicker24HoursFaceComponent_Template_ngx_mat_timepicker_face_timeSelected_0_listener($event) {
            return ctx.onTimeSelected($event);
          });
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵproperty("color", ctx.color)("selectedTime", ctx.selectedHour)("faceTime", ctx.hoursList)("format", ctx.format);
        }
      },
      dependencies: [NgxMatTimepickerFaceComponent],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepicker24HoursFaceComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-24-hours-face",
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [NgxMatTimepickerFaceComponent],
      template: '<ngx-mat-timepicker-face [color]="color"\n                     [selectedTime]="selectedHour"\n                     [faceTime]="hoursList"\n                     [format]="format"\n                     (timeChange)="hourChange.next($event)"\n                     (timeSelected)="onTimeSelected($event)"></ngx-mat-timepicker-face>\n'
    }]
  }], () => [], null);
})();
var NgxMatTimepickerPeriodComponent = class _NgxMatTimepickerPeriodComponent {
  constructor(_overlay) {
    this._overlay = _overlay;
    this.isPeriodAvailable = true;
    this.overlayScrollStrategy = this._overlay.scrollStrategies.reposition();
    this.periodChanged = new EventEmitter();
    this.timePeriod = NgxMatTimepickerPeriods;
  }
  animationDone() {
    this.isPeriodAvailable = true;
  }
  changePeriod(period) {
    this.isPeriodAvailable = this._isSwitchPeriodAvailable(period);
    if (this.isPeriodAvailable) {
      this.periodChanged.next(period);
    }
  }
  _getDisabledTimeByPeriod(period) {
    switch (this.activeTimeUnit) {
      case NgxMatTimepickerUnits.HOUR:
        return NgxMatTimepickerUtils.disableHours(this.hours, {
          min: this.minTime,
          max: this.maxTime,
          format: this.format,
          period
        });
      case NgxMatTimepickerUnits.MINUTE:
        return NgxMatTimepickerUtils.disableMinutes(this.minutes, +this.selectedHour, {
          min: this.minTime,
          max: this.maxTime,
          format: this.format,
          period
        });
      default:
        throw new Error("no such NgxMatTimepickerUnits");
    }
  }
  _isSwitchPeriodAvailable(period) {
    const time = this._getDisabledTimeByPeriod(period);
    return !time.every((t) => t.disabled);
  }
  static {
    this.ɵfac = function NgxMatTimepickerPeriodComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerPeriodComponent)(ɵɵdirectiveInject(Overlay));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgxMatTimepickerPeriodComponent,
      selectors: [["ngx-mat-timepicker-period"]],
      inputs: {
        activeTimeUnit: "activeTimeUnit",
        format: "format",
        hours: "hours",
        maxTime: "maxTime",
        meridiems: "meridiems",
        minTime: "minTime",
        minutes: "minutes",
        selectedHour: "selectedHour",
        selectedPeriod: "selectedPeriod"
      },
      outputs: {
        periodChanged: "periodChanged"
      },
      standalone: true,
      features: [ɵɵStandaloneFeature],
      decls: 7,
      vars: 12,
      consts: [["eventPanelOrigin", "cdkOverlayOrigin"], ["cdkOverlayOrigin", "", 1, "timepicker-period"], ["type", "button", 1, "timepicker-dial__item", "timepicker-period__btn", 3, "click", "ngClass"], ["cdkConnectedOverlay", "", "cdkConnectedOverlayPanelClass", "todo-remove-pointer-events-if-necessary", 3, "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayOpen"], ["class", "timepicker-period__warning", 4, "ngIf"], [1, "timepicker-period__warning"]],
      template: function NgxMatTimepickerPeriodComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = ɵɵgetCurrentView();
          ɵɵelementStart(0, "div", 1, 0)(2, "button", 2);
          ɵɵlistener("click", function NgxMatTimepickerPeriodComponent_Template_button_click_2_listener() {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.changePeriod(ctx.timePeriod.AM));
          });
          ɵɵtext(3);
          ɵɵelementEnd();
          ɵɵelementStart(4, "button", 2);
          ɵɵlistener("click", function NgxMatTimepickerPeriodComponent_Template_button_click_4_listener() {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.changePeriod(ctx.timePeriod.PM));
          });
          ɵɵtext(5);
          ɵɵelementEnd()();
          ɵɵtemplate(6, NgxMatTimepickerPeriodComponent_ng_template_6_Template, 1, 1, "ng-template", 3);
        }
        if (rf & 2) {
          const eventPanelOrigin_r4 = ɵɵreference(1);
          ɵɵadvance(2);
          ɵɵproperty("ngClass", ɵɵpureFunction1(8, _c6, ctx.selectedPeriod === ctx.timePeriod.AM));
          ɵɵadvance();
          ɵɵtextInterpolate(ctx.meridiems[0]);
          ɵɵadvance();
          ɵɵproperty("ngClass", ɵɵpureFunction1(10, _c6, ctx.selectedPeriod === ctx.timePeriod.PM));
          ɵɵadvance();
          ɵɵtextInterpolate(ctx.meridiems[1]);
          ɵɵadvance();
          ɵɵproperty("cdkConnectedOverlayScrollStrategy", ctx.overlayScrollStrategy)("cdkConnectedOverlayPositionStrategy", ctx.overlayPositionStrategy)("cdkConnectedOverlayOrigin", eventPanelOrigin_r4)("cdkConnectedOverlayOpen", !ctx.isPeriodAvailable);
        }
      },
      dependencies: [CdkOverlayOrigin, NgClass, CdkConnectedOverlay, NgIf],
      styles: [".timepicker-period[_ngcontent-%COMP%]{display:flex;flex-direction:column;position:relative}.timepicker-period__btn[_ngcontent-%COMP%]{opacity:.5;padding:1px 3px;border:0;background-color:transparent;font-size:18px;font-weight:500;-webkit-user-select:none;user-select:none;outline:none;border-radius:3px;transition:background-color .5s;color:inherit}.timepicker-period__btn.active[_ngcontent-%COMP%]{opacity:1}.timepicker-period__btn[_ngcontent-%COMP%]:focus{background-color:#00000012}.timepicker-period__warning[_ngcontent-%COMP%]{padding:5px 10px;border-radius:3px;background-color:#0000008c;position:absolute;width:200px;left:-20px;top:40px}.timepicker-period__warning[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]{margin:0;font-size:12px;font-weight:700;color:#fff}"],
      data: {
        animation: [trigger("scaleInOut", [transition(":enter", [style({
          transform: "scale(0)"
        }), animate(".2s", style({
          transform: "scale(1)"
        })), sequence([animate("3s", style({
          opacity: 1
        })), animate(".3s", style({
          opacity: 0
        }))])])])]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerPeriodComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-period",
      animations: [trigger("scaleInOut", [transition(":enter", [style({
        transform: "scale(0)"
      }), animate(".2s", style({
        transform: "scale(1)"
      })), sequence([animate("3s", style({
        opacity: 1
      })), animate(".3s", style({
        opacity: 0
      }))])])])],
      imports: [CdkOverlayOrigin, NgClass, CdkConnectedOverlay, NgIf],
      template: `<div class="timepicker-period"
	 cdkOverlayOrigin
     #eventPanelOrigin="cdkOverlayOrigin">
	<button class="timepicker-dial__item timepicker-period__btn"
			[ngClass]="{'active': selectedPeriod === timePeriod.AM}"
			(click)="changePeriod(timePeriod.AM)"
			type="button">{{meridiems[0]}}</button>
	<button class="timepicker-dial__item timepicker-period__btn"
			[ngClass]="{'active': selectedPeriod === timePeriod.PM}"
			(click)="changePeriod(timePeriod.PM)"
			type="button">{{meridiems[1]}}</button>
</div>
<ng-template
		cdkConnectedOverlay
		cdkConnectedOverlayPanelClass="todo-remove-pointer-events-if-necessary"
		[cdkConnectedOverlayScrollStrategy]="overlayScrollStrategy"
		[cdkConnectedOverlayPositionStrategy]="overlayPositionStrategy"
		[cdkConnectedOverlayOrigin]="eventPanelOrigin"
		[cdkConnectedOverlayOpen]="!isPeriodAvailable">
	<div class="timepicker-period__warning"
		 *ngIf="!isPeriodAvailable"
		 [@scaleInOut]
		 (@scaleInOut.done)="animationDone()">
		<p>Current time would be invalid in this period.</p>
	</div>
</ng-template>
`,
      styles: [".timepicker-period{display:flex;flex-direction:column;position:relative}.timepicker-period__btn{opacity:.5;padding:1px 3px;border:0;background-color:transparent;font-size:18px;font-weight:500;-webkit-user-select:none;user-select:none;outline:none;border-radius:3px;transition:background-color .5s;color:inherit}.timepicker-period__btn.active{opacity:1}.timepicker-period__btn:focus{background-color:#00000012}.timepicker-period__warning{padding:5px 10px;border-radius:3px;background-color:#0000008c;position:absolute;width:200px;left:-20px;top:40px}.timepicker-period__warning>p{margin:0;font-size:12px;font-weight:700;color:#fff}\n"]
    }]
  }], () => [{
    type: Overlay
  }], {
    activeTimeUnit: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    hours: [{
      type: Input
    }],
    maxTime: [{
      type: Input
    }],
    meridiems: [{
      type: Input
    }],
    minTime: [{
      type: Input
    }],
    minutes: [{
      type: Input
    }],
    periodChanged: [{
      type: Output
    }],
    selectedHour: [{
      type: Input
    }],
    selectedPeriod: [{
      type: Input
    }]
  });
})();
var NgxMatTimepickerParserPipe = class _NgxMatTimepickerParserPipe {
  get _locale() {
    return this._timepickerLocaleSrv.locale;
  }
  constructor(_timepickerLocaleSrv) {
    this._timepickerLocaleSrv = _timepickerLocaleSrv;
    this._numberingSystem = import_ts_luxon.DateTime.local().setLocale(this._locale).resolvedLocaleOptions().numberingSystem;
  }
  transform(time, timeUnit = NgxMatTimepickerUnits.HOUR) {
    if (time == null || time === "") {
      return "";
    }
    if (!isNaN(+time)) {
      return `${time}`;
    }
    if (timeUnit === NgxMatTimepickerUnits.MINUTE) {
      return this._parseTime(time, "mm", NgxMatTimepickerMeasure.minute).toString();
    }
    return this._parseTime(time, "HH", NgxMatTimepickerMeasure.hour).toString();
  }
  _parseTime(time, format, timeMeasure) {
    const parsedTime = import_ts_luxon.DateTime.fromFormat(String(time), format, {
      numberingSystem: this._numberingSystem
    })[timeMeasure];
    if (!isNaN(parsedTime)) {
      return parsedTime;
    }
    throw new Error(`Cannot parse time - ${time}`);
  }
  static {
    this.ɵfac = function NgxMatTimepickerParserPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerParserPipe)(ɵɵdirectiveInject(NgxMatTimepickerLocaleService, 16));
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "ngxMatTimepickerParser",
      type: _NgxMatTimepickerParserPipe,
      pure: true,
      standalone: true
    });
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _NgxMatTimepickerParserPipe,
      factory: _NgxMatTimepickerParserPipe.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerParserPipe, [{
    type: Pipe,
    args: [{
      name: "ngxMatTimepickerParser",
      standalone: true
    }]
  }, {
    type: Injectable
  }], () => [{
    type: NgxMatTimepickerLocaleService
  }], null);
})();
var NgxMatTimepickerAutofocusDirective = class _NgxMatTimepickerAutofocusDirective {
  constructor(_element, _document) {
    this._element = _element;
    this._document = _document;
    this._activeElement = this._document.activeElement;
  }
  ngOnChanges() {
    if (this.isFocusActive) {
      setTimeout(() => this._element.nativeElement.focus({
        preventScroll: true
      }));
    }
  }
  ngOnDestroy() {
    setTimeout(() => this._activeElement.focus({
      preventScroll: true
    }));
  }
  static {
    this.ɵfac = function NgxMatTimepickerAutofocusDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerAutofocusDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(DOCUMENT, 8));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NgxMatTimepickerAutofocusDirective,
      selectors: [["", "ngxMatTimepickerAutofocus", ""]],
      inputs: {
        isFocusActive: [0, "ngxMatTimepickerAutofocus", "isFocusActive"]
      },
      standalone: true,
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerAutofocusDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxMatTimepickerAutofocus]",
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [DOCUMENT]
    }]
  }], {
    isFocusActive: [{
      type: Input,
      args: ["ngxMatTimepickerAutofocus"]
    }]
  });
})();
function retainSelection() {
  this.selectionStart = this.selectionEnd;
}
var NgxMatTimepickerDialControlComponent = class _NgxMatTimepickerDialControlComponent {
  get _selectedTime() {
    if (!!this.time) {
      return this.timeList.find((t) => t.time === +this.time);
    }
    return void 0;
  }
  constructor(_elRef, _timeParserPipe) {
    this._elRef = _elRef;
    this._timeParserPipe = _timeParserPipe;
    this.focused = new EventEmitter();
    this.timeChanged = new EventEmitter();
    this.timeUnitChanged = new EventEmitter();
    this.unfocused = new EventEmitter();
  }
  changeTimeByKeyboard(e) {
    const char = String.fromCharCode(e.keyCode);
    if (isTimeDisabledToChange(this.time, char, this.timeList)) {
      e.preventDefault();
    }
  }
  ngAfterViewInit() {
    this._elRef.nativeElement.querySelector("input").addEventListener("select", retainSelection, false);
  }
  ngOnDestroy() {
    this._elRef.nativeElement.querySelector("input").removeEventListener("select", retainSelection);
  }
  onKeydown(e) {
    if (!NgxMatTimepickerUtils.isDigit(e)) {
      e.preventDefault();
    } else {
      this._changeTimeByArrow(e.keyCode);
    }
  }
  onModelChange(value) {
    this.time = this._timeParserPipe.transform(value, this.timeUnit);
  }
  saveTimeAndChangeTimeUnit(event, unit) {
    event.preventDefault();
    this.previousTime = this.time;
    this.timeUnitChanged.next(unit);
    this.focused.next();
  }
  updateTime() {
    if (this._selectedTime) {
      this.timeChanged.next(this._selectedTime);
      this.previousTime = this._selectedTime.time;
    }
  }
  _addTime(amount) {
    return `0${+this.time + amount}`.substr(-2);
  }
  _changeTimeByArrow(keyCode) {
    let time;
    if (keyCode === 38) {
      time = this._addTime(this.minutesGap || 1);
    } else if (keyCode === 40) {
      time = this._addTime(-1 * (this.minutesGap || 1));
    }
    if (!isTimeUnavailable(time, this.timeList)) {
      this.time = time;
      this.updateTime();
    }
  }
  static {
    this.ɵfac = function NgxMatTimepickerDialControlComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerDialControlComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgxMatTimepickerParserPipe));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgxMatTimepickerDialControlComponent,
      selectors: [["ngx-mat-timepicker-dial-control"]],
      inputs: {
        disabled: "disabled",
        isActive: "isActive",
        isEditable: "isEditable",
        minutesGap: "minutesGap",
        time: "time",
        timeList: "timeList",
        timeUnit: "timeUnit"
      },
      outputs: {
        focused: "focused",
        timeChanged: "timeChanged",
        timeUnitChanged: "timeUnitChanged",
        unfocused: "unfocused"
      },
      standalone: true,
      features: [ɵɵProvidersFeature([NgxMatTimepickerParserPipe]), ɵɵStandaloneFeature],
      decls: 3,
      vars: 2,
      consts: [["editableTemplate", ""], ["class", "timepicker-dial__control timepicker-dial__item", "readonly", "", 3, "ngClass", "ngModel", "disabled", "ngxMatTimepickerAutofocus", "ngModelChange", "input", "focus", 4, "ngIf", "ngIfElse"], ["readonly", "", 1, "timepicker-dial__control", "timepicker-dial__item", 3, "ngModelChange", "input", "focus", "ngClass", "ngModel", "disabled", "ngxMatTimepickerAutofocus"], [1, "timepicker-dial__control", "timepicker-dial__item", "timepicker-dial__control_editable", 3, "ngModelChange", "input", "focus", "keydown", "keypress", "ngClass", "ngModel", "disabled", "ngxMatTimepickerAutofocus"]],
      template: function NgxMatTimepickerDialControlComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, NgxMatTimepickerDialControlComponent_input_0_Template, 2, 10, "input", 1)(1, NgxMatTimepickerDialControlComponent_ng_template_1_Template, 3, 13, "ng-template", null, 0, ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
          const editableTemplate_r4 = ɵɵreference(2);
          ɵɵproperty("ngIf", !ctx.isEditable)("ngIfElse", editableTemplate_r4);
        }
      },
      dependencies: [NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, NgClass, NgxMatTimepickerAutofocusDirective, NgxMatTimepickerParserPipe, NgxMatTimepickerTimeLocalizerPipe],
      styles: [".timepicker-dial__control[_ngcontent-%COMP%]{border:none;background-color:transparent;font-size:50px;width:60px;padding:0;border-radius:3px;text-align:center;color:inherit}.timepicker-dial__control[_ngcontent-%COMP%]:focus{outline:none;background-color:#0000001a}.timepicker-dial__control[_ngcontent-%COMP%]:disabled{cursor:default}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerDialControlComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-dial-control",
      providers: [NgxMatTimepickerParserPipe],
      imports: [NgIf, FormsModule, NgClass, NgxMatTimepickerAutofocusDirective, NgxMatTimepickerParserPipe, NgxMatTimepickerTimeLocalizerPipe],
      template: `<input class="timepicker-dial__control timepicker-dial__item"
       [ngClass]="{'active': isActive}"
       [ngModel]="time | timeLocalizer: timeUnit: true"
       (ngModelChange)="time = $event"
       [disabled]="disabled"
       (input)="updateTime()"
       (focus)="saveTimeAndChangeTimeUnit($event, timeUnit)"
       readonly
       [ngxMatTimepickerAutofocus]="isActive"
       *ngIf="!isEditable;else editableTemplate">

<ng-template #editableTemplate>
    <input class="timepicker-dial__control timepicker-dial__item timepicker-dial__control_editable"
           [ngClass]="{'active': isActive}"
           [ngModel]="time | ngxMatTimepickerParser: timeUnit | timeLocalizer: timeUnit : true"
           (ngModelChange)="onModelChange($event)"
           [disabled]="disabled"
           (input)="updateTime()"
           (focus)="saveTimeAndChangeTimeUnit($event, timeUnit)"
           [ngxMatTimepickerAutofocus]="isActive"
           (keydown)="onKeydown($event)"
           (keypress)="changeTimeByKeyboard($event)">
</ng-template>
`,
      styles: [".timepicker-dial__control{border:none;background-color:transparent;font-size:50px;width:60px;padding:0;border-radius:3px;text-align:center;color:inherit}.timepicker-dial__control:focus{outline:none;background-color:#0000001a}.timepicker-dial__control:disabled{cursor:default}\n"]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgxMatTimepickerParserPipe
  }], {
    disabled: [{
      type: Input
    }],
    focused: [{
      type: Output
    }],
    isActive: [{
      type: Input
    }],
    isEditable: [{
      type: Input
    }],
    minutesGap: [{
      type: Input
    }],
    time: [{
      type: Input
    }],
    timeChanged: [{
      type: Output
    }],
    timeList: [{
      type: Input
    }],
    timeUnit: [{
      type: Input
    }],
    timeUnitChanged: [{
      type: Output
    }],
    unfocused: [{
      type: Output
    }]
  });
})();
function isTimeDisabledToChange(currentTime, nextTime, timeList) {
  const isNumber = /\d/.test(nextTime);
  if (isNumber) {
    const time = currentTime + nextTime;
    return isTimeUnavailable(time, timeList);
  }
  return void 0;
}
function isTimeUnavailable(time, timeList) {
  const selectedTime = timeList.find((value) => value.time === +time);
  return !selectedTime || selectedTime && selectedTime.disabled;
}
var NgxMatTimepickerDialComponent = class _NgxMatTimepickerDialComponent {
  set color(newValue) {
    this._color = newValue;
  }
  get color() {
    return this._color;
  }
  get hourString() {
    return `${this.hour}`;
  }
  get minuteString() {
    return `${this.minute}`;
  }
  get _locale() {
    return this._localeSrv.locale;
  }
  constructor(_localeSrv) {
    this._localeSrv = _localeSrv;
    this.hourChanged = new EventEmitter();
    this.meridiems = import_ts_luxon.Info.meridiems({
      locale: this._locale
    });
    this.minuteChanged = new EventEmitter();
    this.periodChanged = new EventEmitter();
    this.timeUnit = NgxMatTimepickerUnits;
    this.timeUnitChanged = new EventEmitter();
    this._color = "primary";
  }
  changeHour(hour) {
    this.hourChanged.next(hour);
  }
  changeMinute(minute) {
    this.minuteChanged.next(minute);
  }
  changePeriod(period) {
    this.periodChanged.next(period);
  }
  changeTimeUnit(unit) {
    this.timeUnitChanged.next(unit);
  }
  hideHint() {
    this.isHintVisible = false;
  }
  ngOnChanges(changes) {
    const periodChanged = changes["period"] && changes["period"].currentValue;
    if (periodChanged || changes["format"] && changes["format"].currentValue) {
      const hours = NgxMatTimepickerUtils.getHours(this.format);
      this.hours = NgxMatTimepickerUtils.disableHours(hours, {
        min: this.minTime,
        max: this.maxTime,
        format: this.format,
        period: this.period
      });
    }
    if (periodChanged || changes["hour"] && changes["hour"].currentValue) {
      const minutes = NgxMatTimepickerUtils.getMinutes(this.minutesGap);
      this.minutes = NgxMatTimepickerUtils.disableMinutes(minutes, +this.hour, {
        min: this.minTime,
        max: this.maxTime,
        format: this.format,
        period: this.period
      });
    }
  }
  showHint() {
    this.isHintVisible = true;
  }
  static {
    this.ɵfac = function NgxMatTimepickerDialComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerDialComponent)(ɵɵdirectiveInject(NgxMatTimepickerLocaleService));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgxMatTimepickerDialComponent,
      selectors: [["ngx-mat-timepicker-dial"]],
      inputs: {
        activeTimeUnit: "activeTimeUnit",
        color: "color",
        editableHintTmpl: "editableHintTmpl",
        format: "format",
        hour: "hour",
        hoursOnly: "hoursOnly",
        isEditable: "isEditable",
        maxTime: "maxTime",
        minTime: "minTime",
        minute: "minute",
        minutesGap: "minutesGap",
        period: "period"
      },
      outputs: {
        hourChanged: "hourChanged",
        minuteChanged: "minuteChanged",
        periodChanged: "periodChanged",
        timeUnitChanged: "timeUnitChanged"
      },
      standalone: true,
      features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
      decls: 9,
      vars: 14,
      consts: [["editableHintDefault", ""], [1, "timepicker-dial"], [1, "timepicker-dial__container"], [1, "timepicker-dial__time"], [3, "timeUnitChanged", "timeChanged", "focused", "unfocused", "timeList", "time", "timeUnit", "isActive", "isEditable"], [3, "timeUnitChanged", "timeChanged", "focused", "unfocused", "timeList", "time", "timeUnit", "isActive", "isEditable", "minutesGap", "disabled"], ["class", "timepicker-dial__period", 3, "selectedPeriod", "activeTimeUnit", "maxTime", "minTime", "format", "hours", "minutes", "selectedHour", "meridiems", "periodChanged", 4, "ngIf"], [3, "ngClass", 4, "ngIf"], [1, "timepicker-dial__period", 3, "periodChanged", "selectedPeriod", "activeTimeUnit", "maxTime", "minTime", "format", "hours", "minutes", "selectedHour", "meridiems"], [3, "ngClass"], [4, "ngTemplateOutlet"], [1, "timepicker-dial__hint"]],
      template: function NgxMatTimepickerDialComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "ngx-mat-timepicker-dial-control", 4);
          ɵɵlistener("timeUnitChanged", function NgxMatTimepickerDialComponent_Template_ngx_mat_timepicker_dial_control_timeUnitChanged_3_listener($event) {
            return ctx.changeTimeUnit($event);
          })("timeChanged", function NgxMatTimepickerDialComponent_Template_ngx_mat_timepicker_dial_control_timeChanged_3_listener($event) {
            return ctx.changeHour($event);
          })("focused", function NgxMatTimepickerDialComponent_Template_ngx_mat_timepicker_dial_control_focused_3_listener() {
            return ctx.showHint();
          })("unfocused", function NgxMatTimepickerDialComponent_Template_ngx_mat_timepicker_dial_control_unfocused_3_listener() {
            return ctx.hideHint();
          });
          ɵɵelementEnd();
          ɵɵelementStart(4, "span");
          ɵɵtext(5, ":");
          ɵɵelementEnd();
          ɵɵelementStart(6, "ngx-mat-timepicker-dial-control", 5);
          ɵɵlistener("timeUnitChanged", function NgxMatTimepickerDialComponent_Template_ngx_mat_timepicker_dial_control_timeUnitChanged_6_listener($event) {
            return ctx.changeTimeUnit($event);
          })("timeChanged", function NgxMatTimepickerDialComponent_Template_ngx_mat_timepicker_dial_control_timeChanged_6_listener($event) {
            return ctx.changeMinute($event);
          })("focused", function NgxMatTimepickerDialComponent_Template_ngx_mat_timepicker_dial_control_focused_6_listener() {
            return ctx.showHint();
          })("unfocused", function NgxMatTimepickerDialComponent_Template_ngx_mat_timepicker_dial_control_unfocused_6_listener() {
            return ctx.hideHint();
          });
          ɵɵelementEnd()();
          ɵɵtemplate(7, NgxMatTimepickerDialComponent_ngx_mat_timepicker_period_7_Template, 1, 9, "ngx-mat-timepicker-period", 6);
          ɵɵelementEnd();
          ɵɵtemplate(8, NgxMatTimepickerDialComponent_div_8_Template, 4, 4, "div", 7);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵadvance(3);
          ɵɵproperty("timeList", ctx.hours)("time", ctx.hourString)("timeUnit", ctx.timeUnit.HOUR)("isActive", ctx.activeTimeUnit === ctx.timeUnit.HOUR)("isEditable", ctx.isEditable);
          ɵɵadvance(3);
          ɵɵproperty("timeList", ctx.minutes)("time", ctx.minuteString)("timeUnit", ctx.timeUnit.MINUTE)("isActive", ctx.activeTimeUnit === ctx.timeUnit.MINUTE)("isEditable", ctx.isEditable)("minutesGap", ctx.minutesGap)("disabled", ctx.hoursOnly);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.format !== 24);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.isEditable || ctx.editableHintTmpl);
        }
      },
      dependencies: [NgxMatTimepickerDialControlComponent, NgIf, NgxMatTimepickerPeriodComponent, NgClass, NgTemplateOutlet],
      styles: [".timepicker-dial[_ngcontent-%COMP%]{text-align:center}.timepicker-dial__container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}.timepicker-dial__time[_ngcontent-%COMP%]{display:flex;align-items:baseline;line-height:normal;font-size:50px}.timepicker-dial__period[_ngcontent-%COMP%]{display:block;margin-left:10px}.timepicker-dial__hint-container--hidden[_ngcontent-%COMP%]{visibility:hidden}.timepicker-dial__hint[_ngcontent-%COMP%]{display:inline-block;font-size:10px}.timepicker-dial__hint[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:14px}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerDialComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-dial",
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [NgxMatTimepickerDialControlComponent, NgIf, NgxMatTimepickerPeriodComponent, NgClass, NgTemplateOutlet],
      template: `<div class="timepicker-dial">
    <div class="timepicker-dial__container">
        <div class="timepicker-dial__time">
            <ngx-mat-timepicker-dial-control [timeList]="hours"
                                         [time]="hourString"
                                         [timeUnit]="timeUnit.HOUR"
                                         [isActive]="activeTimeUnit === timeUnit.HOUR"
                                         [isEditable]="isEditable"
                                         (timeUnitChanged)="changeTimeUnit($event)"
                                         (timeChanged)="changeHour($event)"
                                         (focused)="showHint()"
                                         (unfocused)="hideHint()">

            </ngx-mat-timepicker-dial-control>
            <span>:</span>
            <ngx-mat-timepicker-dial-control [timeList]="minutes"
                                         [time]="minuteString"
                                         [timeUnit]="timeUnit.MINUTE"
                                         [isActive]="activeTimeUnit === timeUnit.MINUTE"
                                         [isEditable]="isEditable"
                                         [minutesGap]="minutesGap"
                                         [disabled]="hoursOnly"
                                         (timeUnitChanged)="changeTimeUnit($event)"
                                         (timeChanged)="changeMinute($event)"
                                         (focused)="showHint()"
                                         (unfocused)="hideHint()">

            </ngx-mat-timepicker-dial-control>
        </div>
        <ngx-mat-timepicker-period class="timepicker-dial__period"
                                   *ngIf="format !== 24"
                                   [selectedPeriod]="period"
                                   [activeTimeUnit]="activeTimeUnit"
                                   [maxTime]="maxTime"
                                   [minTime]="minTime"
                                   [format]="format"
                                   [hours]="hours"
                                   [minutes]="minutes"
                                   [selectedHour]="hour"
                                   [meridiems]="meridiems"
                                   (periodChanged)="changePeriod($event)"></ngx-mat-timepicker-period>
    </div>
    <div *ngIf="isEditable || editableHintTmpl"
         [ngClass]="{'timepicker-dial__hint-container--hidden': !isHintVisible}">
        <ng-container *ngTemplateOutlet="editableHintTmpl ? editableHintTmpl : editableHintDefault"></ng-container>
        <ng-template #editableHintDefault>
            <small class="timepicker-dial__hint"> * use arrows (<span>&#8645;</span>) to change the time</small>
        </ng-template>
    </div>
</div>
`,
      styles: [".timepicker-dial{text-align:center}.timepicker-dial__container{display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}.timepicker-dial__time{display:flex;align-items:baseline;line-height:normal;font-size:50px}.timepicker-dial__period{display:block;margin-left:10px}.timepicker-dial__hint-container--hidden{visibility:hidden}.timepicker-dial__hint{display:inline-block;font-size:10px}.timepicker-dial__hint span{font-size:14px}\n"]
    }]
  }], () => [{
    type: NgxMatTimepickerLocaleService
  }], {
    activeTimeUnit: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    editableHintTmpl: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    hour: [{
      type: Input
    }],
    hourChanged: [{
      type: Output
    }],
    hoursOnly: [{
      type: Input
    }],
    isEditable: [{
      type: Input
    }],
    maxTime: [{
      type: Input
    }],
    minTime: [{
      type: Input
    }],
    minute: [{
      type: Input
    }],
    minuteChanged: [{
      type: Output
    }],
    minutesGap: [{
      type: Input
    }],
    period: [{
      type: Input
    }],
    periodChanged: [{
      type: Output
    }],
    timeUnitChanged: [{
      type: Output
    }]
  });
})();
var NgxMatTimepickerContentComponent = class _NgxMatTimepickerContentComponent {
  static {
    this.ɵfac = function NgxMatTimepickerContentComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerContentComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgxMatTimepickerContentComponent,
      selectors: [["ngx-mat-timepicker-content"]],
      inputs: {
        appendToInput: "appendToInput",
        inputElement: "inputElement"
      },
      standalone: true,
      features: [ɵɵStandaloneFeature],
      ngContentSelectors: _c8,
      decls: 5,
      vars: 2,
      consts: [["timepickerModal", ""], ["timepickerOutlet", ""], [4, "ngIf", "ngIfElse"], [4, "ngTemplateOutlet"]],
      template: function NgxMatTimepickerContentComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵtemplate(0, NgxMatTimepickerContentComponent_div_0_Template, 2, 1, "div", 2)(1, NgxMatTimepickerContentComponent_ng_template_1_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(3, NgxMatTimepickerContentComponent_ng_template_3_Template, 1, 0, "ng-template", null, 1, ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
          const timepickerModal_r2 = ɵɵreference(2);
          ɵɵproperty("ngIf", ctx.appendToInput)("ngIfElse", timepickerModal_r2);
        }
      },
      dependencies: [NgIf, NgTemplateOutlet],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerContentComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-content",
      imports: [NgIf, NgTemplateOutlet],
      template: '<div *ngIf="appendToInput;else timepickerModal">\n	<ng-container *ngTemplateOutlet="timepickerOutlet"></ng-container>\n</div>\n<ng-template #timepickerModal>\n	<ng-container *ngTemplateOutlet="timepickerOutlet"></ng-container>\n</ng-template>\n<ng-template #timepickerOutlet>\n	<ng-content></ng-content>\n</ng-template>\n'
    }]
  }], null, {
    appendToInput: [{
      type: Input
    }],
    inputElement: [{
      type: Input
    }]
  });
})();
var NgxMatTimepickerDialogComponent = class _NgxMatTimepickerDialogComponent extends NgxMatTimepickerBaseDirective {
  constructor(data, _dialogRef, timepickerSrv, eventSrv, timepickerLocaleSrv) {
    super(timepickerSrv, eventSrv, timepickerLocaleSrv, data);
    this.data = data;
    this._dialogRef = _dialogRef;
  }
  close() {
    this._dialogRef.close();
  }
  static {
    this.ɵfac = function NgxMatTimepickerDialogComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerDialogComponent)(ɵɵdirectiveInject(MAT_DIALOG_DATA), ɵɵdirectiveInject(MatDialogRef), ɵɵdirectiveInject(NgxMatTimepickerService), ɵɵdirectiveInject(NgxMatTimepickerEventService), ɵɵdirectiveInject(NgxMatTimepickerLocaleService));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgxMatTimepickerDialogComponent,
      selectors: [["ngx-mat-timepicker-dialog"]],
      standalone: true,
      features: [ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
      decls: 21,
      vars: 29,
      consts: [["cancelBtnDefault", ""], ["confirmBtnDefault", ""], ["ampmHours", ""], ["mat-dialog-content", ""], [3, "appendToInput", "inputElement"], [1, "timepicker", 3, "ngClass"], [1, "timepicker-header", 3, "color"], [3, "periodChanged", "timeUnitChanged", "hourChanged", "minuteChanged", "color", "format", "hour", "minute", "period", "activeTimeUnit", "minTime", "maxTime", "isEditable", "editableHintTmpl", "minutesGap", "hoursOnly"], [1, "timepicker__main-content"], [1, "timepicker__body", 3, "ngSwitch"], [4, "ngSwitchCase"], [3, "color", "dottedMinutesInGap", "selectedMinute", "selectedHour", "minTime", "maxTime", "format", "period", "minutesGap", "minuteChange", 4, "ngSwitchCase"], ["mat-dialog-actions", ""], [3, "click"], [4, "ngTemplateOutlet"], ["mat-button", "", 3, "color"], [3, "color", "selectedHour", "minTime", "maxTime", "format", "hourChange", "hourSelected", 4, "ngIf", "ngIfElse"], [3, "hourChange", "hourSelected", "color", "selectedHour", "minTime", "maxTime", "format"], [3, "hourChange", "hourSelected", "color", "selectedHour", "period", "minTime", "maxTime"], [3, "minuteChange", "color", "dottedMinutesInGap", "selectedMinute", "selectedHour", "minTime", "maxTime", "format", "period", "minutesGap"]],
      template: function NgxMatTimepickerDialogComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = ɵɵgetCurrentView();
          ɵɵtemplate(0, NgxMatTimepickerDialogComponent_ng_template_0_Template, 2, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, NgxMatTimepickerDialogComponent_ng_template_2_Template, 2, 1, "ng-template", null, 1, ɵɵtemplateRefExtractor);
          ɵɵelementStart(4, "div", 3)(5, "ngx-mat-timepicker-content", 4)(6, "div", 5)(7, "mat-toolbar", 6)(8, "ngx-mat-timepicker-dial", 7);
          ɵɵpipe(9, "async");
          ɵɵpipe(10, "async");
          ɵɵpipe(11, "async");
          ɵɵlistener("periodChanged", function NgxMatTimepickerDialogComponent_Template_ngx_mat_timepicker_dial_periodChanged_8_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.changePeriod($event));
          })("timeUnitChanged", function NgxMatTimepickerDialogComponent_Template_ngx_mat_timepicker_dial_timeUnitChanged_8_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.changeTimeUnit($event));
          })("hourChanged", function NgxMatTimepickerDialogComponent_Template_ngx_mat_timepicker_dial_hourChanged_8_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.onHourChange($event));
          })("minuteChanged", function NgxMatTimepickerDialogComponent_Template_ngx_mat_timepicker_dial_minuteChanged_8_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.onMinuteChange($event));
          });
          ɵɵelementEnd()();
          ɵɵelementStart(12, "div", 8)(13, "div", 9);
          ɵɵtemplate(14, NgxMatTimepickerDialogComponent_div_14_Template, 4, 2, "div", 10)(15, NgxMatTimepickerDialogComponent_ngx_mat_timepicker_minutes_face_15_Template, 4, 15, "ngx-mat-timepicker-minutes-face", 11);
          ɵɵelementEnd()()()()();
          ɵɵelementStart(16, "div", 12)(17, "div", 13);
          ɵɵlistener("click", function NgxMatTimepickerDialogComponent_Template_div_click_17_listener() {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.close());
          });
          ɵɵtemplate(18, NgxMatTimepickerDialogComponent_ng_container_18_Template, 1, 0, "ng-container", 14);
          ɵɵelementEnd();
          ɵɵelementStart(19, "div", 13);
          ɵɵlistener("click", function NgxMatTimepickerDialogComponent_Template_div_click_19_listener() {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.setTime());
          });
          ɵɵtemplate(20, NgxMatTimepickerDialogComponent_ng_container_20_Template, 1, 0, "ng-container", 14);
          ɵɵelementEnd()();
        }
        if (rf & 2) {
          let tmp_9_0;
          let tmp_10_0;
          const cancelBtnDefault_r7 = ɵɵreference(1);
          const confirmBtnDefault_r8 = ɵɵreference(3);
          ɵɵadvance(5);
          ɵɵproperty("appendToInput", ctx.data.appendToInput)("inputElement", ctx.data.inputElement);
          ɵɵadvance();
          ɵɵproperty("ngClass", ctx.data.timepickerClass);
          ɵɵadvance();
          ɵɵclassProp("is-editable", ctx.data.enableKeyboardInput);
          ɵɵproperty("color", ctx.color);
          ɵɵadvance();
          ɵɵproperty("color", ctx.color)("format", ctx.data.format)("hour", (tmp_9_0 = ɵɵpipeBind1(9, 23, ctx.selectedHour)) == null ? null : tmp_9_0.time)("minute", (tmp_10_0 = ɵɵpipeBind1(10, 25, ctx.selectedMinute)) == null ? null : tmp_10_0.time)("period", ɵɵpipeBind1(11, 27, ctx.selectedPeriod))("activeTimeUnit", ctx.activeTimeUnit)("minTime", ctx.data.minTime)("maxTime", ctx.data.maxTime)("isEditable", ctx.data.enableKeyboardInput)("editableHintTmpl", ctx.data.editableHintTmpl)("minutesGap", ctx.data.minutesGap)("hoursOnly", ctx.data.hoursOnly);
          ɵɵadvance(5);
          ɵɵproperty("ngSwitch", ctx.activeTimeUnit);
          ɵɵadvance();
          ɵɵproperty("ngSwitchCase", ctx.timeUnit.HOUR);
          ɵɵadvance();
          ɵɵproperty("ngSwitchCase", ctx.timeUnit.MINUTE);
          ɵɵadvance(3);
          ɵɵproperty("ngTemplateOutlet", ctx.data.cancelBtnTmpl ? ctx.data.cancelBtnTmpl : cancelBtnDefault_r7);
          ɵɵadvance(2);
          ɵɵproperty("ngTemplateOutlet", ctx.data.confirmBtnTmpl ? ctx.data.confirmBtnTmpl : confirmBtnDefault_r8);
        }
      },
      dependencies: [
        AsyncPipe,
        // Common
        NgClass,
        NgIf,
        NgSwitch,
        NgSwitchCase,
        NgTemplateOutlet,
        // Material
        MatButtonModule,
        MatButton,
        MatDialogModule,
        MatDialogActions,
        MatDialogContent,
        MatToolbarModule,
        MatToolbar,
        // NgxMatTimepicker
        NgxMatTimepickerContentComponent,
        NgxMatTimepickerDialComponent,
        NgxMatTimepicker24HoursFaceComponent,
        NgxMatTimepicker12HoursFaceComponent,
        NgxMatTimepickerMinutesFaceComponent
      ],
      styles: ["div.ngx-mat-timepicker-dialog>mat-dialog-container{padding-top:0}div.ngx-mat-timepicker-dialog>mat-dialog-container [mat-dialog-content]{padding:0;max-height:85vh}div.ngx-mat-timepicker-dialog>mat-dialog-container [mat-dialog-content] mat-toolbar.timepicker-header{display:flex;justify-content:center;align-items:center}div.ngx-mat-timepicker-dialog>mat-dialog-container [mat-dialog-content] mat-toolbar.timepicker-header.is-editable{height:auto}div.ngx-mat-timepicker-dialog>mat-dialog-container [mat-dialog-content] .clock-face{margin:16px}div.ngx-mat-timepicker-dialog>mat-dialog-container div[mat-dialog-actions]{justify-content:flex-end;display:flex}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerDialogComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-dialog",
      encapsulation: ViewEncapsulation$1.None,
      imports: [
        AsyncPipe,
        // Common
        NgClass,
        NgIf,
        NgSwitch,
        NgSwitchCase,
        NgTemplateOutlet,
        // Material
        MatButtonModule,
        MatDialogModule,
        MatToolbarModule,
        // NgxMatTimepicker
        NgxMatTimepickerContentComponent,
        NgxMatTimepickerDialComponent,
        NgxMatTimepicker24HoursFaceComponent,
        NgxMatTimepicker12HoursFaceComponent,
        NgxMatTimepickerMinutesFaceComponent
      ],
      template: '<ng-template #cancelBtnDefault>\n	<button mat-button\n			[color]="color">CANCEL\n	</button>\n</ng-template>\n<ng-template #confirmBtnDefault>\n	<button mat-button\n			[color]="color">OK\n	</button>\n</ng-template>\n<div mat-dialog-content>\n	<ngx-mat-timepicker-content [appendToInput]="data.appendToInput"\n								[inputElement]="data.inputElement">\n		<div class="timepicker"\n			 [ngClass]="data.timepickerClass">\n			<mat-toolbar [color]="color"\n						 [class.is-editable]="data.enableKeyboardInput"\n						 class="timepicker-header">\n				<ngx-mat-timepicker-dial [color]="color"\n										 [format]="data.format"\n										 [hour]="(selectedHour | async)?.time"\n										 [minute]="(selectedMinute | async)?.time"\n										 [period]="selectedPeriod | async"\n										 [activeTimeUnit]="activeTimeUnit"\n										 [minTime]="data.minTime"\n										 [maxTime]="data.maxTime"\n										 [isEditable]="data.enableKeyboardInput"\n										 [editableHintTmpl]="data.editableHintTmpl"\n										 [minutesGap]="data.minutesGap"\n										 [hoursOnly]="data.hoursOnly"\n										 (periodChanged)="changePeriod($event)"\n										 (timeUnitChanged)="changeTimeUnit($event)"\n										 (hourChanged)="onHourChange($event)"\n										 (minuteChanged)="onMinuteChange($event)"\n				></ngx-mat-timepicker-dial>\n			</mat-toolbar>\n			<div class="timepicker__main-content">\n				<div class="timepicker__body"\n					 [ngSwitch]="activeTimeUnit">\n					<div *ngSwitchCase="timeUnit.HOUR">\n						<ngx-mat-timepicker-24-hours-face *ngIf="data.format === 24;else ampmHours"\n														  [color]="color"\n														  (hourChange)="onHourChange($event)"\n														  [selectedHour]="selectedHour | async"\n														  [minTime]="data.minTime"\n														  [maxTime]="data.maxTime"\n														  [format]="data.format"\n														  (hourSelected)="onHourSelected($event)"></ngx-mat-timepicker-24-hours-face>\n						<ng-template #ampmHours>\n							<ngx-mat-timepicker-12-hours-face\n									[color]="color"\n									(hourChange)="onHourChange($event)"\n									[selectedHour]="selectedHour | async"\n									[period]="selectedPeriod | async"\n									[minTime]="data.minTime"\n									[maxTime]="data.maxTime"\n									(hourSelected)="onHourSelected($event)"></ngx-mat-timepicker-12-hours-face>\n						</ng-template>\n					</div>\n					<ngx-mat-timepicker-minutes-face *ngSwitchCase="timeUnit.MINUTE"\n													 [color]="color"\n													 [dottedMinutesInGap]="data.dottedMinutesInGap"\n													 [selectedMinute]="selectedMinute | async"\n													 [selectedHour]="(selectedHour | async)?.time"\n													 [minTime]="data.minTime"\n													 [maxTime]="data.maxTime"\n													 [format]="data.format"\n													 [period]="selectedPeriod | async"\n													 [minutesGap]="data.minutesGap"\n													 (minuteChange)="onMinuteChange($event)"></ngx-mat-timepicker-minutes-face>\n				</div>\n			</div>\n		</div>\n	</ngx-mat-timepicker-content>\n</div>\n<div mat-dialog-actions>\n	<div (click)="close()">\n		<ng-container\n				*ngTemplateOutlet="data.cancelBtnTmpl ? data.cancelBtnTmpl : cancelBtnDefault"></ng-container>\n	</div>\n	<div (click)="setTime()">\n		<ng-container\n				*ngTemplateOutlet="data.confirmBtnTmpl ? data.confirmBtnTmpl : confirmBtnDefault"></ng-container>\n	</div>\n</div>\n',
      styles: ["div.ngx-mat-timepicker-dialog>mat-dialog-container{padding-top:0}div.ngx-mat-timepicker-dialog>mat-dialog-container [mat-dialog-content]{padding:0;max-height:85vh}div.ngx-mat-timepicker-dialog>mat-dialog-container [mat-dialog-content] mat-toolbar.timepicker-header{display:flex;justify-content:center;align-items:center}div.ngx-mat-timepicker-dialog>mat-dialog-container [mat-dialog-content] mat-toolbar.timepicker-header.is-editable{height:auto}div.ngx-mat-timepicker-dialog>mat-dialog-container [mat-dialog-content] .clock-face{margin:16px}div.ngx-mat-timepicker-dialog>mat-dialog-container div[mat-dialog-actions]{justify-content:flex-end;display:flex}\n"]
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MAT_DIALOG_DATA]
    }]
  }, {
    type: MatDialogRef
  }, {
    type: NgxMatTimepickerService
  }, {
    type: NgxMatTimepickerEventService
  }, {
    type: NgxMatTimepickerLocaleService
  }], null);
})();
var NgxMatTimepickerStandaloneComponent = class _NgxMatTimepickerStandaloneComponent extends NgxMatTimepickerBaseDirective {
  constructor(data, timepickerSrv, eventSrv, timepickerLocaleSrv) {
    super(timepickerSrv, eventSrv, timepickerLocaleSrv, data);
    this.data = data;
  }
  close() {
    this.data.timepickerBaseRef.close();
  }
  static {
    this.ɵfac = function NgxMatTimepickerStandaloneComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerStandaloneComponent)(ɵɵdirectiveInject(NGX_MAT_TIMEPICKER_CONFIG), ɵɵdirectiveInject(NgxMatTimepickerService), ɵɵdirectiveInject(NgxMatTimepickerEventService), ɵɵdirectiveInject(NgxMatTimepickerLocaleService));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgxMatTimepickerStandaloneComponent,
      selectors: [["ngx-mat-timepicker-standalone"]],
      hostVars: 2,
      hostBindings: function NgxMatTimepickerStandaloneComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassProp("mat-app-background", true);
        }
      },
      standalone: true,
      features: [ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
      decls: 21,
      vars: 29,
      consts: [["cancelBtnDefault", ""], ["confirmBtnDefault", ""], ["ampmHours", ""], ["cdkTrapFocus", ""], [3, "appendToInput", "inputElement"], [1, "timepicker", 3, "ngClass"], [1, "timepicker-header", 3, "color"], [3, "periodChanged", "timeUnitChanged", "hourChanged", "minuteChanged", "color", "format", "hour", "minute", "period", "activeTimeUnit", "minTime", "maxTime", "isEditable", "editableHintTmpl", "minutesGap", "hoursOnly"], [1, "timepicker__main-content"], [1, "timepicker__body", 3, "ngSwitch"], [4, "ngSwitchCase"], [3, "dottedMinutesInGap", "color", "selectedMinute", "selectedHour", "minTime", "maxTime", "format", "period", "minutesGap", "minuteChange", 4, "ngSwitchCase"], [1, "ngx-mat-timepicker-standalone-actions"], [3, "click"], [4, "ngTemplateOutlet"], ["mat-button", "", 3, "color"], [3, "color", "selectedHour", "minTime", "maxTime", "format", "hourChange", "hourSelected", 4, "ngIf", "ngIfElse"], [3, "hourChange", "hourSelected", "color", "selectedHour", "minTime", "maxTime", "format"], [3, "hourChange", "hourSelected", "color", "selectedHour", "period", "minTime", "maxTime"], [3, "minuteChange", "dottedMinutesInGap", "color", "selectedMinute", "selectedHour", "minTime", "maxTime", "format", "period", "minutesGap"]],
      template: function NgxMatTimepickerStandaloneComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = ɵɵgetCurrentView();
          ɵɵtemplate(0, NgxMatTimepickerStandaloneComponent_ng_template_0_Template, 2, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, NgxMatTimepickerStandaloneComponent_ng_template_2_Template, 2, 1, "ng-template", null, 1, ɵɵtemplateRefExtractor);
          ɵɵelementStart(4, "div", 3)(5, "ngx-mat-timepicker-content", 4)(6, "div", 5)(7, "mat-toolbar", 6)(8, "ngx-mat-timepicker-dial", 7);
          ɵɵpipe(9, "async");
          ɵɵpipe(10, "async");
          ɵɵpipe(11, "async");
          ɵɵlistener("periodChanged", function NgxMatTimepickerStandaloneComponent_Template_ngx_mat_timepicker_dial_periodChanged_8_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.changePeriod($event));
          })("timeUnitChanged", function NgxMatTimepickerStandaloneComponent_Template_ngx_mat_timepicker_dial_timeUnitChanged_8_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.changeTimeUnit($event));
          })("hourChanged", function NgxMatTimepickerStandaloneComponent_Template_ngx_mat_timepicker_dial_hourChanged_8_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.onHourChange($event));
          })("minuteChanged", function NgxMatTimepickerStandaloneComponent_Template_ngx_mat_timepicker_dial_minuteChanged_8_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.onMinuteChange($event));
          });
          ɵɵelementEnd()();
          ɵɵelementStart(12, "div", 8)(13, "div", 9);
          ɵɵtemplate(14, NgxMatTimepickerStandaloneComponent_div_14_Template, 4, 2, "div", 10)(15, NgxMatTimepickerStandaloneComponent_ngx_mat_timepicker_minutes_face_15_Template, 4, 15, "ngx-mat-timepicker-minutes-face", 11);
          ɵɵelementEnd()()()();
          ɵɵelementStart(16, "div", 12)(17, "div", 13);
          ɵɵlistener("click", function NgxMatTimepickerStandaloneComponent_Template_div_click_17_listener() {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.close());
          });
          ɵɵtemplate(18, NgxMatTimepickerStandaloneComponent_ng_container_18_Template, 1, 0, "ng-container", 14);
          ɵɵelementEnd();
          ɵɵelementStart(19, "div", 13);
          ɵɵlistener("click", function NgxMatTimepickerStandaloneComponent_Template_div_click_19_listener() {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.setTime());
          });
          ɵɵtemplate(20, NgxMatTimepickerStandaloneComponent_ng_container_20_Template, 1, 0, "ng-container", 14);
          ɵɵelementEnd()()();
        }
        if (rf & 2) {
          let tmp_9_0;
          let tmp_10_0;
          const cancelBtnDefault_r7 = ɵɵreference(1);
          const confirmBtnDefault_r8 = ɵɵreference(3);
          ɵɵadvance(5);
          ɵɵproperty("appendToInput", ctx.data.appendToInput)("inputElement", ctx.data.inputElement);
          ɵɵadvance();
          ɵɵproperty("ngClass", ctx.data.timepickerClass);
          ɵɵadvance();
          ɵɵclassProp("is-editable", ctx.data.enableKeyboardInput);
          ɵɵproperty("color", ctx.color);
          ɵɵadvance();
          ɵɵproperty("color", ctx.color)("format", ctx.data.format)("hour", (tmp_9_0 = ɵɵpipeBind1(9, 23, ctx.selectedHour)) == null ? null : tmp_9_0.time)("minute", (tmp_10_0 = ɵɵpipeBind1(10, 25, ctx.selectedMinute)) == null ? null : tmp_10_0.time)("period", ɵɵpipeBind1(11, 27, ctx.selectedPeriod))("activeTimeUnit", ctx.activeTimeUnit)("minTime", ctx.data.minTime)("maxTime", ctx.data.maxTime)("isEditable", ctx.data.enableKeyboardInput)("editableHintTmpl", ctx.data.editableHintTmpl)("minutesGap", ctx.data.minutesGap)("hoursOnly", ctx.data.hoursOnly);
          ɵɵadvance(5);
          ɵɵproperty("ngSwitch", ctx.activeTimeUnit);
          ɵɵadvance();
          ɵɵproperty("ngSwitchCase", ctx.timeUnit.HOUR);
          ɵɵadvance();
          ɵɵproperty("ngSwitchCase", ctx.timeUnit.MINUTE);
          ɵɵadvance(3);
          ɵɵproperty("ngTemplateOutlet", ctx.data.cancelBtnTmpl ? ctx.data.cancelBtnTmpl : cancelBtnDefault_r7);
          ɵɵadvance(2);
          ɵɵproperty("ngTemplateOutlet", ctx.data.confirmBtnTmpl ? ctx.data.confirmBtnTmpl : confirmBtnDefault_r8);
        }
      },
      dependencies: [MatButtonModule, MatButton, A11yModule, CdkTrapFocus, NgxMatTimepickerContentComponent, NgClass, MatToolbarModule, MatToolbar, NgxMatTimepickerDialComponent, NgSwitch, NgSwitchCase, NgIf, NgxMatTimepicker24HoursFaceComponent, NgxMatTimepicker12HoursFaceComponent, NgxMatTimepickerMinutesFaceComponent, NgTemplateOutlet, AsyncPipe],
      styles: ["ngx-mat-timepicker-standalone{display:block;border-radius:4px;box-shadow:0 0 5px 2px #00000040;overflow:hidden}ngx-mat-timepicker-standalone ngx-mat-timepicker-content{display:block}ngx-mat-timepicker-standalone ngx-mat-timepicker-content mat-toolbar.timepicker-header{display:flex;justify-content:center;align-items:center}ngx-mat-timepicker-standalone ngx-mat-timepicker-content mat-toolbar.timepicker-header.is-editable{height:auto}ngx-mat-timepicker-standalone ngx-mat-timepicker-content .clock-face{margin:16px}ngx-mat-timepicker-standalone .ngx-mat-timepicker-standalone-actions{display:flex;flex-direction:row;justify-content:flex-end;padding:0 16px 16px}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerStandaloneComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-standalone",
      host: {
        "[class.mat-app-background]": "true"
      },
      encapsulation: ViewEncapsulation$1.None,
      imports: [MatButtonModule, A11yModule, NgxMatTimepickerContentComponent, NgClass, MatToolbarModule, NgxMatTimepickerDialComponent, NgSwitch, NgSwitchCase, NgIf, NgxMatTimepicker24HoursFaceComponent, NgxMatTimepicker12HoursFaceComponent, NgxMatTimepickerMinutesFaceComponent, NgTemplateOutlet, AsyncPipe],
      template: '<ng-template #cancelBtnDefault>\n	<button mat-button\n			[color]="color">CANCEL\n	</button>\n</ng-template>\n<ng-template #confirmBtnDefault>\n	<button mat-button\n			[color]="color">OK\n	</button>\n</ng-template>\n<div cdkTrapFocus>\n	<ngx-mat-timepicker-content [appendToInput]="data.appendToInput"\n								[inputElement]="data.inputElement">\n		<div class="timepicker"\n			 [ngClass]="data.timepickerClass">\n			<mat-toolbar [color]="color"\n						 [class.is-editable]="data.enableKeyboardInput"\n						 class="timepicker-header">\n				<ngx-mat-timepicker-dial [color]="color"\n										 [format]="data.format"\n										 [hour]="(selectedHour | async)?.time"\n										 [minute]="(selectedMinute | async)?.time"\n										 [period]="selectedPeriod | async"\n										 [activeTimeUnit]="activeTimeUnit"\n										 [minTime]="data.minTime"\n										 [maxTime]="data.maxTime"\n										 [isEditable]="data.enableKeyboardInput"\n										 [editableHintTmpl]="data.editableHintTmpl"\n										 [minutesGap]="data.minutesGap"\n										 [hoursOnly]="data.hoursOnly"\n										 (periodChanged)="changePeriod($event)"\n										 (timeUnitChanged)="changeTimeUnit($event)"\n										 (hourChanged)="onHourChange($event)"\n										 (minuteChanged)="onMinuteChange($event)">\n				</ngx-mat-timepicker-dial>\n			</mat-toolbar>\n			<div class="timepicker__main-content">\n				<div class="timepicker__body"\n					 [ngSwitch]="activeTimeUnit">\n					<div *ngSwitchCase="timeUnit.HOUR">\n						<ngx-mat-timepicker-24-hours-face *ngIf="data.format === 24;else ampmHours"\n														  [color]="color"\n														  (hourChange)="onHourChange($event)"\n														  [selectedHour]="selectedHour | async"\n														  [minTime]="data.minTime"\n														  [maxTime]="data.maxTime"\n														  [format]="data.format"\n														  (hourSelected)="onHourSelected($event)"></ngx-mat-timepicker-24-hours-face>\n						<ng-template #ampmHours>\n							<ngx-mat-timepicker-12-hours-face\n									[color]="color"\n									(hourChange)="onHourChange($event)"\n									[selectedHour]="selectedHour | async"\n									[period]="selectedPeriod | async"\n									[minTime]="data.minTime"\n									[maxTime]="data.maxTime"\n									(hourSelected)="onHourSelected($event)"></ngx-mat-timepicker-12-hours-face>\n						</ng-template>\n					</div>\n					<ngx-mat-timepicker-minutes-face *ngSwitchCase="timeUnit.MINUTE"\n													 [dottedMinutesInGap]="data.dottedMinutesInGap"\n													 [color]="color"\n													 [selectedMinute]="selectedMinute | async"\n													 [selectedHour]="(selectedHour | async)?.time"\n													 [minTime]="data.minTime"\n													 [maxTime]="data.maxTime"\n													 [format]="data.format"\n													 [period]="selectedPeriod | async"\n													 [minutesGap]="data.minutesGap"\n													 (minuteChange)="onMinuteChange($event)"></ngx-mat-timepicker-minutes-face>\n				</div>\n			</div>\n		</div>\n	</ngx-mat-timepicker-content>\n\n	<div class="ngx-mat-timepicker-standalone-actions">\n		<div (click)="close()">\n			<ng-container\n					*ngTemplateOutlet="data.cancelBtnTmpl ? data.cancelBtnTmpl : cancelBtnDefault"></ng-container>\n		</div>\n		<div (click)="setTime()">\n			<ng-container\n					*ngTemplateOutlet="data.confirmBtnTmpl ? data.confirmBtnTmpl : confirmBtnDefault"></ng-container>\n		</div>\n	</div>\n</div>\n',
      styles: ["ngx-mat-timepicker-standalone{display:block;border-radius:4px;box-shadow:0 0 5px 2px #00000040;overflow:hidden}ngx-mat-timepicker-standalone ngx-mat-timepicker-content{display:block}ngx-mat-timepicker-standalone ngx-mat-timepicker-content mat-toolbar.timepicker-header{display:flex;justify-content:center;align-items:center}ngx-mat-timepicker-standalone ngx-mat-timepicker-content mat-toolbar.timepicker-header.is-editable{height:auto}ngx-mat-timepicker-standalone ngx-mat-timepicker-content .clock-face{margin:16px}ngx-mat-timepicker-standalone .ngx-mat-timepicker-standalone-actions{display:flex;flex-direction:row;justify-content:flex-end;padding:0 16px 16px}\n"]
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [NGX_MAT_TIMEPICKER_CONFIG]
    }]
  }, {
    type: NgxMatTimepickerService
  }, {
    type: NgxMatTimepickerEventService
  }, {
    type: NgxMatTimepickerLocaleService
  }], null);
})();
var config;
var NgxMatTimepickerProvider = class _NgxMatTimepickerProvider {
  static {
    this.ɵfac = function NgxMatTimepickerProvider_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerProvider)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgxMatTimepickerProvider,
      selectors: [["ngx-mat-timepicker-provider"]],
      standalone: true,
      features: [ɵɵProvidersFeature([{
        provide: NGX_MAT_TIMEPICKER_CONFIG,
        useFactory() {
          return config;
        }
      }]), ɵɵStandaloneFeature],
      decls: 1,
      vars: 0,
      template: function NgxMatTimepickerProvider_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelement(0, "ngx-mat-timepicker-standalone");
        }
      },
      dependencies: [NgxMatTimepickerStandaloneComponent],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerProvider, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-provider",
      template: `
		<ngx-mat-timepicker-standalone></ngx-mat-timepicker-standalone>`,
      providers: [{
        provide: NGX_MAT_TIMEPICKER_CONFIG,
        useFactory() {
          return config;
        }
      }],
      imports: [NgxMatTimepickerStandaloneComponent]
    }]
  }], null, null);
})();
var NgxMatTimepickerComponent = class _NgxMatTimepickerComponent {
  static {
    this.nextId = 0;
  }
  set appendToInput(newValue) {
    this._appendToInput = coerceBooleanProperty(newValue);
  }
  set color(newValue) {
    this._color = newValue;
  }
  get color() {
    return this._color;
  }
  get disabled() {
    return this._timepickerInput && this._timepickerInput.disabled;
  }
  set dottedMinutesInGap(newValue) {
    this._dottedMinutesInGap = coerceBooleanProperty(newValue);
  }
  get dottedMinutesInGap() {
    return this._dottedMinutesInGap;
  }
  set enableKeyboardInput(newValue) {
    this._enableKeyboardInput = coerceBooleanProperty(newValue);
  }
  get enableKeyboardInput() {
    return this._enableKeyboardInput;
  }
  get format() {
    return this._timepickerInput ? this._timepickerInput.format : this._format;
  }
  set format(value) {
    this._format = NgxMatTimepickerAdapter.isTwentyFour(value) ? 24 : 12;
  }
  get inputElement() {
    return this._timepickerInput && this._timepickerInput.element;
  }
  get maxTime() {
    return this._timepickerInput ? this._timepickerInput.max : this.max;
  }
  get minTime() {
    return this._timepickerInput ? this._timepickerInput.min : this.min;
  }
  get minutesGap() {
    return this._minutesGap;
  }
  set minutesGap(gap) {
    if (gap == null) {
      return;
    }
    gap = Math.floor(gap);
    this._minutesGap = gap <= 59 ? gap : 1;
  }
  get overlayOrigin() {
    return this._timepickerInput ? this._timepickerInput.cdkOverlayOrigin : void 0;
  }
  get time() {
    return this._timepickerInput && this._timepickerInput.value;
  }
  constructor(_dialog) {
    this._dialog = _dialog;
    this.closed = new EventEmitter();
    this.hourSelected = new EventEmitter();
    this.hoursOnly = false;
    this.id = `ngx_mat_timepicker_${++_NgxMatTimepickerComponent.nextId}`;
    this.isEsc = true;
    this.opened = new EventEmitter();
    this.overlayPositions = [{
      originX: "center",
      originY: "bottom",
      overlayX: "center",
      overlayY: "top",
      offsetY: 0
    }, {
      originX: "center",
      originY: "top",
      overlayX: "center",
      overlayY: "bottom",
      offsetY: 0
    }];
    this.showPicker = false;
    this.timeChanged = new EventEmitter();
    this.timeSet = new EventEmitter();
    this.timeUpdated = new BehaviorSubject(void 0);
    this._appendToInput = false;
    this._color = "primary";
    this._dottedMinutesInGap = false;
    this._enableKeyboardInput = false;
    this._format = 12;
  }
  close() {
    if (this._appendToInput) {
      this._overlayRef && this._overlayRef.dispose();
    } else {
      this._dialogRef && this._dialogRef.close();
    }
    this.inputElement.focus();
    this.showPicker = false;
    this.closed.emit();
  }
  open() {
    config = {
      timepickerBaseRef: this,
      time: this.time,
      defaultTime: this.defaultTime,
      dottedMinutesInGap: this._dottedMinutesInGap,
      maxTime: this.maxTime,
      minTime: this.minTime,
      format: this.format,
      minutesGap: this.minutesGap,
      disableAnimation: this.disableAnimation,
      cancelBtnTmpl: this.cancelBtnTmpl,
      confirmBtnTmpl: this.confirmBtnTmpl,
      editableHintTmpl: this.editableHintTmpl,
      disabled: this.disabled,
      enableKeyboardInput: this.enableKeyboardInput,
      preventOverlayClick: this.preventOverlayClick,
      appendToInput: this._appendToInput,
      hoursOnly: this.hoursOnly,
      timepickerClass: this.timepickerClass,
      inputElement: this.inputElement,
      color: this.color
    };
    if (this._appendToInput) {
      this.showPicker = true;
    } else {
      this._dialogRef = this._dialog.open(NgxMatTimepickerDialogComponent, {
        panelClass: "ngx-mat-timepicker-dialog",
        data: __spreadValues({}, config)
      });
      this._dialogRef.afterClosed().subscribe(() => {
        this.closed.emit();
      });
    }
    this.opened.emit();
  }
  /***
   * Register an input with this timepicker.
   * input - The timepicker input to register with this timepicker
   */
  registerInput(input) {
    if (this._timepickerInput) {
      console.warn("Input for this timepicker was already set", input.element);
      throw Error("A Timepicker can only be associated with a single input.");
    }
    this._timepickerInput = input;
  }
  unregisterInput() {
    this._timepickerInput = void 0;
  }
  updateTime(time) {
    this.timeUpdated.next(time);
  }
  static {
    this.ɵfac = function NgxMatTimepickerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerComponent)(ɵɵdirectiveInject(MatDialog));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgxMatTimepickerComponent,
      selectors: [["ngx-mat-timepicker"]],
      hostVars: 1,
      hostBindings: function NgxMatTimepickerComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵhostProperty("id", ctx.id);
        }
      },
      inputs: {
        appendToInput: "appendToInput",
        color: "color",
        dottedMinutesInGap: "dottedMinutesInGap",
        enableKeyboardInput: "enableKeyboardInput",
        format: "format",
        minutesGap: "minutesGap",
        cancelBtnTmpl: "cancelBtnTmpl",
        confirmBtnTmpl: "confirmBtnTmpl",
        defaultTime: "defaultTime",
        disableAnimation: "disableAnimation",
        editableHintTmpl: "editableHintTmpl",
        hoursOnly: "hoursOnly",
        isEsc: "isEsc",
        max: "max",
        min: "min",
        preventOverlayClick: "preventOverlayClick",
        timepickerClass: "timepickerClass"
      },
      outputs: {
        closed: "closed",
        hourSelected: "hourSelected",
        opened: "opened",
        timeChanged: "timeChanged",
        timeSet: "timeSet"
      },
      standalone: true,
      features: [ɵɵStandaloneFeature],
      decls: 1,
      vars: 4,
      consts: [["cdkConnectedOverlay", "", "cdkConnectedOverlayBackdropClass", "cdk-overlay-transparent-backdrop", 3, "backdropClick", "cdkConnectedOverlayPositions", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayOpen"]],
      template: function NgxMatTimepickerComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, NgxMatTimepickerComponent_ng_template_0_Template, 1, 0, "ng-template", 0);
          ɵɵlistener("backdropClick", function NgxMatTimepickerComponent_Template_ng_template_backdropClick_0_listener() {
            return ctx.close();
          });
        }
        if (rf & 2) {
          ɵɵproperty("cdkConnectedOverlayPositions", ctx.overlayPositions)("cdkConnectedOverlayHasBackdrop", true)("cdkConnectedOverlayOrigin", ctx.overlayOrigin)("cdkConnectedOverlayOpen", ctx.showPicker);
        }
      },
      dependencies: [CdkConnectedOverlay, NgxMatTimepickerProvider],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker",
      template: `
		<ng-template
				cdkConnectedOverlay
				[cdkConnectedOverlayPositions]="overlayPositions"
				[cdkConnectedOverlayHasBackdrop]="!0"
				cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
				(backdropClick)="close()"
				[cdkConnectedOverlayOrigin]="overlayOrigin"
				[cdkConnectedOverlayOpen]="showPicker">
			<ngx-mat-timepicker-provider></ngx-mat-timepicker-provider>
		</ng-template>
    `,
      imports: [CdkConnectedOverlay, NgxMatTimepickerStandaloneComponent, NgxMatTimepickerProvider]
    }]
  }], () => [{
    type: MatDialog
  }], {
    appendToInput: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    dottedMinutesInGap: [{
      type: Input
    }],
    enableKeyboardInput: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    minutesGap: [{
      type: Input
    }],
    cancelBtnTmpl: [{
      type: Input
    }],
    closed: [{
      type: Output
    }],
    confirmBtnTmpl: [{
      type: Input
    }],
    defaultTime: [{
      type: Input
    }],
    disableAnimation: [{
      type: Input
    }],
    editableHintTmpl: [{
      type: Input
    }],
    hourSelected: [{
      type: Output
    }],
    hoursOnly: [{
      type: Input
    }],
    id: [{
      type: HostBinding,
      args: ["id"]
    }],
    isEsc: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    opened: [{
      type: Output
    }],
    preventOverlayClick: [{
      type: Input
    }],
    timeChanged: [{
      type: Output
    }],
    timepickerClass: [{
      type: Input
    }],
    timeSet: [{
      type: Output
    }]
  });
})();
var NgxMatTimepickerToggleIconDirective = class _NgxMatTimepickerToggleIconDirective {
  static {
    this.ɵfac = function NgxMatTimepickerToggleIconDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerToggleIconDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NgxMatTimepickerToggleIconDirective,
      selectors: [["", "ngxMatTimepickerToggleIcon", ""]],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerToggleIconDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxMatTimepickerToggleIcon]",
      standalone: true
    }]
  }], null, null);
})();
var NgxMatTimepickerToggleComponent = class _NgxMatTimepickerToggleComponent {
  get disabled() {
    return this._disabled === void 0 ? this.timepicker?.disabled : this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
  }
  open(event) {
    if (this.timepicker) {
      this.timepicker.open();
      event.stopPropagation();
    }
  }
  static {
    this.ɵfac = function NgxMatTimepickerToggleComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerToggleComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgxMatTimepickerToggleComponent,
      selectors: [["ngx-mat-timepicker-toggle"]],
      contentQueries: function NgxMatTimepickerToggleComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, NgxMatTimepickerToggleIconDirective, 7);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.customIcon = _t.first);
        }
      },
      inputs: {
        disabled: "disabled",
        timepicker: [0, "for", "timepicker"]
      },
      standalone: true,
      features: [ɵɵStandaloneFeature],
      ngContentSelectors: _c10,
      decls: 3,
      vars: 2,
      consts: [["color", "", "mat-icon-button", "", "type", "button", 1, "ngx-mat-timepicker-toggle", "mat-elevation-z0", 3, "click", "disabled"], ["xmlns", "http://www.w3.org/2000/svg", "class", "ngx-mat-timepicker-toggle-default-icon", "fill", "currentColor", "viewBox", "0 0 24 24", "width", "24px", "height", "24px", 4, "ngIf"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "currentColor", "viewBox", "0 0 24 24", "width", "24px", "height", "24px", 1, "ngx-mat-timepicker-toggle-default-icon"], ["d", "M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003                   6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z"]],
      template: function NgxMatTimepickerToggleComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef(_c9);
          ɵɵelementStart(0, "button", 0);
          ɵɵlistener("click", function NgxMatTimepickerToggleComponent_Template_button_click_0_listener($event) {
            return ctx.open($event);
          });
          ɵɵtemplate(1, NgxMatTimepickerToggleComponent__svg_svg_1_Template, 2, 0, "svg", 1);
          ɵɵprojection(2);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵproperty("disabled", ctx.disabled);
          ɵɵadvance();
          ɵɵproperty("ngIf", !ctx.customIcon);
        }
      },
      dependencies: [MatButtonModule, MatIconButton, NgIf],
      styles: ["button.ngx-mat-timepicker-toggle{background-color:transparent;text-align:center;-webkit-user-select:none;user-select:none;cursor:pointer;box-shadow:none}.mat-form-field .ngx-mat-timepicker-toggle-default-icon{margin:auto}.mat-form-field .ngx-mat-timepicker-toggle-default-icon{display:block;width:1.5em;height:1.5em}body .ngx-mat-timepicker-toggle{color:#0000008a}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerToggleComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-toggle",
      encapsulation: ViewEncapsulation$1.None,
      imports: [MatButtonModule, NgIf],
      template: '<button class="ngx-mat-timepicker-toggle mat-elevation-z0"\n        color=""\n        mat-icon-button\n        (click)="open($event)"\n        [disabled]="disabled"\n        type="button">\n    <svg xmlns="http://www.w3.org/2000/svg"\n         class="ngx-mat-timepicker-toggle-default-icon"\n         fill="currentColor"\n         viewBox="0 0 24 24"\n         width="24px"\n         height="24px"\n         *ngIf="!customIcon">\n        <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003                   6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z" />\n    </svg>\n\n    <ng-content select="[ngxMatTimepickerToggleIcon]"></ng-content>\n</button>\n',
      styles: ["button.ngx-mat-timepicker-toggle{background-color:transparent;text-align:center;-webkit-user-select:none;user-select:none;cursor:pointer;box-shadow:none}.mat-form-field .ngx-mat-timepicker-toggle-default-icon{margin:auto}.mat-form-field .ngx-mat-timepicker-toggle-default-icon{display:block;width:1.5em;height:1.5em}body .ngx-mat-timepicker-toggle{color:#0000008a}\n"]
    }]
  }], null, {
    disabled: [{
      type: Input
    }],
    customIcon: [{
      type: ContentChild,
      args: [NgxMatTimepickerToggleIconDirective, {
        static: true
      }]
    }],
    timepicker: [{
      type: Input,
      args: ["for"]
    }]
  });
})();
function concatTime(currentTime, nextTime) {
  const isNumber = /\d/.test(nextTime);
  if (isNumber) {
    const time = currentTime + nextTime;
    return +time;
  }
  return void 0;
}
var NgxMatTimepickerControlComponent = class _NgxMatTimepickerControlComponent {
  static {
    this.nextId = 0;
  }
  set color(newValue) {
    this._color = newValue;
  }
  get color() {
    return this._color;
  }
  set floatLabel(newValue) {
    this._floatLabel = newValue;
  }
  get floatLabel() {
    return this._floatLabel;
  }
  constructor(_timeParser) {
    this._timeParser = _timeParser;
    this.id = _NgxMatTimepickerControlComponent.nextId++;
    this.timeChanged = new EventEmitter();
    this._color = "primary";
    this._floatLabel = "auto";
  }
  changeTime(event) {
    event.stopPropagation();
    const char = event.data;
    const time = concatTime(String(this.time), char);
    this._changeTimeIfValid(time);
  }
  decrease() {
    if (!this.disabled) {
      let previousTime = +this.time - 1;
      if (previousTime < this.min) {
        previousTime = this.max;
      }
      if (this._isSelectedTimeDisabled(previousTime)) {
        previousTime = this._getAvailableTime(previousTime, this._getPrevAvailableTime.bind(this));
      }
      if (previousTime !== this.time) {
        this.timeChanged.emit(previousTime);
      }
    }
  }
  increase() {
    if (!this.disabled) {
      let nextTime = +this.time + 1;
      if (nextTime > this.max) {
        nextTime = this.min;
      }
      if (this._isSelectedTimeDisabled(nextTime)) {
        nextTime = this._getAvailableTime(nextTime, this._getNextAvailableTime.bind(this));
      }
      if (nextTime !== this.time) {
        this.timeChanged.emit(nextTime);
      }
    }
  }
  ngOnChanges(changes) {
    if (changes["timeList"] && this.time != null) {
      if (this._isSelectedTimeDisabled(this.time)) {
        this._setAvailableTime();
      }
    }
  }
  onBlur() {
    this.isFocused = false;
    if (this._previousTime !== this.time) {
      this._changeTimeIfValid(+this.time);
    }
  }
  onFocus() {
    this.isFocused = true;
    this._previousTime = this.time;
  }
  onKeydown(event) {
    event.stopPropagation();
    if (!NgxMatTimepickerUtils.isDigit(event)) {
      event.preventDefault();
    }
    switch (event.key) {
      case "ArrowUp":
        this.increase();
        break;
      case "ArrowDown":
        this.decrease();
        break;
    }
    if (this.preventTyping && event.key !== "Tab") {
      event.preventDefault();
    }
  }
  onModelChange(value) {
    this.time = +this._timeParser.transform(value, this.timeUnit);
  }
  _changeTimeIfValid(value) {
    if (!isNaN(value)) {
      this.time = value;
      if (this.time > this.max) {
        const timeString = String(value);
        this.time = +timeString[timeString.length - 1];
      }
      if (this.time < this.min) {
        this.time = this.min;
      }
      this.timeChanged.emit(this.time);
    }
  }
  _getAvailableTime(currentTime, fn) {
    const currentTimeIndex = this.timeList.findIndex((time) => time.time === currentTime);
    const availableTime = fn(currentTimeIndex);
    return availableTime != null ? availableTime : this.time;
  }
  _getNextAvailableTime(index) {
    const timeCollection = this.timeList;
    const maxValue = timeCollection.length;
    for (let i = index + 1; i < maxValue; i++) {
      const time = timeCollection[i];
      if (!time.disabled) {
        return time.time;
      }
    }
    return void 0;
  }
  _getPrevAvailableTime(index) {
    for (let i = index; i >= 0; i--) {
      const time = this.timeList[i];
      if (!time.disabled) {
        return time.time;
      }
    }
    return void 0;
  }
  _isSelectedTimeDisabled(time) {
    return this.timeList.find((faceTime) => faceTime.time === time).disabled;
  }
  _setAvailableTime() {
    this.time = this.timeList.find((t) => !t.disabled).time;
    this.timeChanged.emit(this.time);
  }
  static {
    this.ɵfac = function NgxMatTimepickerControlComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerControlComponent)(ɵɵdirectiveInject(NgxMatTimepickerParserPipe));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgxMatTimepickerControlComponent,
      selectors: [["ngx-mat-timepicker-time-control"]],
      inputs: {
        color: "color",
        disabled: "disabled",
        floatLabel: "floatLabel",
        max: "max",
        min: "min",
        placeholder: "placeholder",
        preventTyping: "preventTyping",
        time: "time",
        timeList: "timeList",
        timeUnit: "timeUnit"
      },
      outputs: {
        timeChanged: "timeChanged"
      },
      standalone: true,
      features: [ɵɵProvidersFeature([NgxMatTimepickerParserPipe]), ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
      decls: 13,
      vars: 19,
      consts: [[1, "ngx-mat-timepicker-control", 3, "color", "floatLabel", "ngClass"], ["matInput", "", "maxlength", "2", 3, "ngModelChange", "keydown", "beforeinput", "focus", "blur", "id", "name", "ngModel", "placeholder", "disabled"], ["matSuffix", "", 1, "arrows-wrap"], ["role", "button", 1, "arrow", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "height", "18", "viewBox", "0 0 24 24", "width", "18"], ["d", "M0 0h24v24H0z", "fill", "none"], ["d", "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"], ["d", "M0 0h24v24H0V0z", "fill", "none"], ["d", "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"]],
      template: function NgxMatTimepickerControlComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "mat-form-field", 0)(1, "input", 1);
          ɵɵpipe(2, "ngxMatTimepickerParser");
          ɵɵpipe(3, "timeLocalizer");
          ɵɵlistener("ngModelChange", function NgxMatTimepickerControlComponent_Template_input_ngModelChange_1_listener($event) {
            return ctx.onModelChange($event);
          })("keydown", function NgxMatTimepickerControlComponent_Template_input_keydown_1_listener($event) {
            return ctx.onKeydown($event);
          })("beforeinput", function NgxMatTimepickerControlComponent_Template_input_beforeinput_1_listener($event) {
            return ctx.changeTime($event);
          })("focus", function NgxMatTimepickerControlComponent_Template_input_focus_1_listener() {
            return ctx.onFocus();
          })("blur", function NgxMatTimepickerControlComponent_Template_input_blur_1_listener() {
            return ctx.onBlur();
          });
          ɵɵelementEnd();
          ɵɵelementStart(4, "div", 2)(5, "span", 3);
          ɵɵlistener("click", function NgxMatTimepickerControlComponent_Template_span_click_5_listener() {
            return ctx.increase();
          });
          ɵɵnamespaceSVG();
          ɵɵelementStart(6, "svg", 4);
          ɵɵelement(7, "path", 5)(8, "path", 6);
          ɵɵelementEnd()();
          ɵɵnamespaceHTML();
          ɵɵelementStart(9, "span", 3);
          ɵɵlistener("click", function NgxMatTimepickerControlComponent_Template_span_click_9_listener() {
            return ctx.decrease();
          });
          ɵɵnamespaceSVG();
          ɵɵelementStart(10, "svg", 4);
          ɵɵelement(11, "path", 7)(12, "path", 8);
          ɵɵelementEnd()()()();
        }
        if (rf & 2) {
          ɵɵproperty("color", ctx.color)("floatLabel", ctx.floatLabel)("ngClass", ɵɵpureFunction1(17, _c6, ctx.isFocused));
          ɵɵadvance();
          ɵɵpropertyInterpolate1("id", "ngx_mat_timepicker_field_", ctx.id, "");
          ɵɵpropertyInterpolate1("name", "ngx_mat_timepicker_field_", ctx.id, "");
          ɵɵproperty("ngModel", ɵɵpipeBind3(3, 13, ɵɵpipeBind2(2, 10, ctx.time, ctx.timeUnit), ctx.timeUnit, true))("placeholder", ctx.placeholder)("disabled", ctx.disabled);
        }
      },
      dependencies: [MatFormFieldModule, MatFormField, MatSuffix, NgClass, MatInputModule, MatInput, FormsModule, DefaultValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, NgxMatTimepickerParserPipe, NgxMatTimepickerTimeLocalizerPipe],
      styles: [".ngx-mat-timepicker-control[_ngcontent-%COMP%]{width:60px;min-width:60px}.ngx-mat-timepicker-control[_ngcontent-%COMP%]   .arrows-wrap[_ngcontent-%COMP%]{position:relative;z-index:1}.ngx-mat-timepicker-control[_ngcontent-%COMP%]   .arrows-wrap[_ngcontent-%COMP%] > .arrow[_ngcontent-%COMP%]{text-align:center;opacity:.5;height:15px;cursor:pointer;transition:opacity .2s;-webkit-user-select:none;user-select:none}.ngx-mat-timepicker-control[_ngcontent-%COMP%]   .arrows-wrap[_ngcontent-%COMP%] > .arrow[_ngcontent-%COMP%]:hover{opacity:1}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerControlComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-time-control",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [NgxMatTimepickerParserPipe],
      imports: [MatFormFieldModule, NgClass, MatInputModule, FormsModule, NgxMatTimepickerParserPipe, NgxMatTimepickerTimeLocalizerPipe],
      template: `<mat-form-field [color]="color"
                [floatLabel]="floatLabel"
                [ngClass]="{'active': isFocused}"
                class="ngx-mat-timepicker-control">
    <input id="ngx_mat_timepicker_field_{{id}}"
           name="ngx_mat_timepicker_field_{{id}}"
           matInput
           maxlength="2"
           [ngModel]="time | ngxMatTimepickerParser: timeUnit | timeLocalizer: timeUnit : true"
           (ngModelChange)="onModelChange($event)"
           [placeholder]="placeholder"
           [disabled]="disabled"
           (keydown)="onKeydown($event)"
           (beforeinput)="changeTime($event)"
           (focus)="onFocus()"
           (blur)="onBlur()" />
    <div class="arrows-wrap"
         matSuffix>
        <span class="arrow"
              role="button"
              (click)="increase()">
            <svg xmlns="http://www.w3.org/2000/svg"
                 height="18"
                 viewBox="0 0 24 24"
                 width="18">
                <path d="M0 0h24v24H0z"
                      fill="none" />
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            </svg>
        </span>
        <span class="arrow"
              role="button"
              (click)="decrease()">
            <svg xmlns="http://www.w3.org/2000/svg"
                 height="18"
                 viewBox="0 0 24 24"
                 width="18">
                <path d="M0 0h24v24H0V0z"
                      fill="none" />
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            </svg>
        </span>
    </div>
</mat-form-field>
`,
      styles: [".ngx-mat-timepicker-control{width:60px;min-width:60px}.ngx-mat-timepicker-control .arrows-wrap{position:relative;z-index:1}.ngx-mat-timepicker-control .arrows-wrap>.arrow{text-align:center;opacity:.5;height:15px;cursor:pointer;transition:opacity .2s;-webkit-user-select:none;user-select:none}.ngx-mat-timepicker-control .arrows-wrap>.arrow:hover{opacity:1}\n"]
    }]
  }], () => [{
    type: NgxMatTimepickerParserPipe
  }], {
    color: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    floatLabel: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    preventTyping: [{
      type: Input
    }],
    time: [{
      type: Input
    }],
    timeChanged: [{
      type: Output
    }],
    timeList: [{
      type: Input
    }],
    timeUnit: [{
      type: Input
    }]
  });
})();
var NgxMatTimepickerFieldComponent = class _NgxMatTimepickerFieldComponent {
  get color() {
    return this._color;
  }
  set color(newValue) {
    this._color = newValue;
  }
  get defaultTime() {
    return this._defaultTime;
  }
  set defaultTime(val) {
    this._defaultTime = val;
    this._isDefaultTime = !!val;
  }
  get floatLabel() {
    return this._floatLabel;
  }
  set floatLabel(newValue) {
    this._floatLabel = newValue;
  }
  get format() {
    return this._format;
  }
  set format(value) {
    if (NgxMatTimepickerAdapter.isTwentyFour(value)) {
      this._format = 24;
      this.minHour = 0;
      this.maxHour = 23;
    } else {
      this._format = 12;
      this.minHour = 1;
      this.maxHour = 12;
    }
    this.hoursList = NgxMatTimepickerUtils.getHours(this._format);
    const isDynamicallyChanged = value && this._previousFormat && this._previousFormat !== this._format;
    if (isDynamicallyChanged) {
      this._updateTime(this.timepickerTime);
    }
    this._previousFormat = this._format;
  }
  get max() {
    return this._max;
  }
  set max(value) {
    if (typeof value === "string") {
      this._max = NgxMatTimepickerAdapter.parseTime(value, {
        locale: this._locale,
        format: this.format
      });
      return;
    }
    this._max = value;
  }
  get min() {
    return this._min;
  }
  set min(value) {
    if (typeof value === "string") {
      this._min = NgxMatTimepickerAdapter.parseTime(value, {
        locale: this._locale,
        format: this.format
      });
      return;
    }
    this._min = value;
  }
  get _locale() {
    return this._timepickerLocaleSrv.locale;
  }
  constructor(_timepickerService, _timepickerLocaleSrv) {
    this._timepickerService = _timepickerService;
    this._timepickerLocaleSrv = _timepickerLocaleSrv;
    this.hour$ = new BehaviorSubject(void 0);
    this.maxHour = 12;
    this.minHour = 1;
    this.minute$ = new BehaviorSubject(void 0);
    this.period = NgxMatTimepickerPeriods.AM;
    this.periods = [NgxMatTimepickerPeriods.AM, NgxMatTimepickerPeriods.PM];
    this.timeChanged = new EventEmitter();
    this.timeUnit = NgxMatTimepickerUnits;
    this._color = "primary";
    this._floatLabel = "auto";
    this._format = 12;
    this._isFirstTimeChange = true;
    this._subsCtrl$ = new Subject();
    this._onChange = () => {
    };
    this._onTouched = () => {
    };
  }
  changeHour(hour) {
    this._timepickerService.hour = this.hoursList.find((h) => h.time === hour);
    this._changeTime();
  }
  changeMinute(minute) {
    this._timepickerService.minute = this.minutesList.find((m) => m.time === minute);
    this._changeTime();
  }
  changePeriod(event) {
    this._timepickerService.period = event.value;
    this._changeTime();
  }
  ngOnDestroy() {
    this._subsCtrl$.next();
    this._subsCtrl$.complete();
  }
  ngOnInit() {
    this._initTime(this.defaultTime);
    this.hoursList = NgxMatTimepickerUtils.getHours(this._format);
    this.minutesList = NgxMatTimepickerUtils.getMinutes();
    this.isTimeRangeSet = !!(this.min || this.max);
    this._timepickerService.selectedHour.pipe(tap((clockTime) => this._selectedHour = clockTime?.time), map(this._changeDefaultTimeValue.bind(this)), tap(() => this.isTimeRangeSet && this._updateAvailableMinutes())).subscribe({
      next: (v) => this.hour$.next(v)
    });
    this._timepickerService.selectedMinute.pipe(map(this._changeDefaultTimeValue.bind(this)), tap(() => this._isFirstTimeChange = false)).subscribe({
      next: (v) => this.minute$.next(v)
    });
    if (this.format === 12) {
      this._timepickerService.selectedPeriod.pipe(distinctUntilChanged(), tap((period) => this.period = period), tap((period) => this.isChangePeriodDisabled = this._isPeriodDisabled(period)), takeUntil(this._subsCtrl$)).subscribe(() => this.isTimeRangeSet && this._updateAvailableTime());
    } else {
      this.isTimeRangeSet && this._updateAvailableTime();
    }
  }
  onTimeSet(time) {
    this._updateTime(time);
    this._emitLocalTimeChange(time);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  writeValue(val) {
    if (val) {
      this._initTime(val);
    } else {
      this._resetTime();
    }
  }
  _changeDefaultTimeValue(clockFaceTime) {
    if (!this._isDefaultTime && this._isFirstTimeChange) {
      return __spreadProps(__spreadValues({}, clockFaceTime), {
        time: null
      });
    }
    return clockFaceTime;
  }
  _changeTime() {
    if (!isNaN(this.hour$.getValue()?.time) && !isNaN(this.minute$.getValue()?.time)) {
      const time = this._timepickerService.getFullTime(this.format);
      this.timepickerTime = time;
      this._emitLocalTimeChange(time);
    }
  }
  _emitLocalTimeChange(time) {
    const localTime = NgxMatTimepickerAdapter.toLocaleTimeString(time, {
      format: this.format,
      locale: this._locale
    });
    this._onChange(localTime);
    this._onTouched(localTime);
    this.timeChanged.emit(localTime);
  }
  _initTime(time) {
    const isDefaultTimeAvailable = NgxMatTimepickerAdapter.isTimeAvailable(time, this.min, this.max, "minutes", null, this.format);
    if (!isDefaultTimeAvailable) {
      if (this.min) {
        this._updateTime(NgxMatTimepickerAdapter.fromDateTimeToString(this.min, this.format));
        return;
      }
      if (this.max) {
        this._updateTime(NgxMatTimepickerAdapter.fromDateTimeToString(this.max, this.format));
        return;
      }
    }
    this._updateTime(time);
  }
  _isPeriodDisabled(period) {
    return NgxMatTimepickerUtils.disableHours(NgxMatTimepickerUtils.getHours(12), {
      min: this.min,
      max: this.max,
      format: 12,
      period: period === NgxMatTimepickerPeriods.AM ? NgxMatTimepickerPeriods.PM : NgxMatTimepickerPeriods.AM
    }).every((time) => time.disabled);
  }
  _resetTime() {
    this._timepickerService.hour = {
      angle: 0,
      time: null
    };
    this._timepickerService.minute = {
      angle: 0,
      time: null
    };
  }
  _updateAvailableHours() {
    this.hoursList = NgxMatTimepickerUtils.disableHours(this.hoursList, {
      min: this.min,
      max: this.max,
      format: this.format,
      period: this.period
    });
  }
  _updateAvailableMinutes() {
    this.minutesList = NgxMatTimepickerUtils.disableMinutes(this.minutesList, this._selectedHour, {
      min: this.min,
      max: this.max,
      format: this.format,
      period: this.period
    });
  }
  _updateAvailableTime() {
    this._updateAvailableHours();
    if (this._selectedHour) {
      this._updateAvailableMinutes();
    }
  }
  _updateTime(time) {
    if (time) {
      const formattedTime = NgxMatTimepickerAdapter.formatTime(time, {
        locale: this._locale,
        format: this.format
      });
      this._timepickerService.setDefaultTimeIfAvailable(formattedTime, this.min, this.max, this.format);
      this.timepickerTime = formattedTime;
    }
  }
  static {
    this.ɵfac = function NgxMatTimepickerFieldComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerFieldComponent)(ɵɵdirectiveInject(NgxMatTimepickerService), ɵɵdirectiveInject(NgxMatTimepickerLocaleService));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgxMatTimepickerFieldComponent,
      selectors: [["ngx-mat-timepicker-field"]],
      inputs: {
        color: "color",
        defaultTime: "defaultTime",
        floatLabel: "floatLabel",
        format: "format",
        max: "max",
        min: "min",
        cancelBtnTmpl: "cancelBtnTmpl",
        confirmBtnTmpl: "confirmBtnTmpl",
        controlOnly: "controlOnly",
        disabled: "disabled",
        toggleIcon: "toggleIcon"
      },
      outputs: {
        timeChanged: "timeChanged"
      },
      standalone: true,
      features: [ɵɵProvidersFeature([NgxMatTimepickerService, {
        provide: NG_VALUE_ACCESSOR,
        useExisting: _NgxMatTimepickerFieldComponent,
        multi: true
      }]), ɵɵStandaloneFeature],
      decls: 11,
      vars: 32,
      consts: [["timepicker", ""], ["defaultIcon", ""], [1, "ngx-mat-timepicker", 3, "ngClass"], [1, "ngx-mat-timepicker__control--first", 3, "timeChanged", "color", "floatLabel", "placeholder", "time", "min", "max", "timeUnit", "disabled", "timeList", "preventTyping"], [1, "separator-colon", "ngx-mat-timepicker__control--second"], [1, "ngx-mat-timepicker__control--third", 3, "timeChanged", "color", "floatLabel", "placeholder", "time", "min", "max", "timeUnit", "disabled", "timeList", "preventTyping"], ["class", "period-select ngx-mat-timepicker__control--forth", 3, "color", 4, "ngIf"], ["class", "ngx-mat-timepicker__toggle", 3, "for", "disabled", 4, "ngIf"], [3, "timeSet", "color", "min", "max", "defaultTime", "format", "cancelBtnTmpl", "confirmBtnTmpl"], [1, "period-select", "ngx-mat-timepicker__control--forth", 3, "color"], [3, "selectionChange", "disabled", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [1, "ngx-mat-timepicker__toggle", 3, "for", "disabled"], ["ngxMatTimepickerToggleIcon", ""], [4, "ngTemplateOutlet"]],
      template: function NgxMatTimepickerFieldComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = ɵɵgetCurrentView();
          ɵɵelementStart(0, "div", 2)(1, "ngx-mat-timepicker-time-control", 3);
          ɵɵlistener("timeChanged", function NgxMatTimepickerFieldComponent_Template_ngx_mat_timepicker_time_control_timeChanged_1_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.changeHour($event));
          });
          ɵɵelementEnd();
          ɵɵelementStart(2, "span", 4);
          ɵɵtext(3, ":");
          ɵɵelementEnd();
          ɵɵelementStart(4, "ngx-mat-timepicker-time-control", 5);
          ɵɵlistener("timeChanged", function NgxMatTimepickerFieldComponent_Template_ngx_mat_timepicker_time_control_timeChanged_4_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.changeMinute($event));
          });
          ɵɵelementEnd();
          ɵɵtemplate(5, NgxMatTimepickerFieldComponent_mat_form_field_5_Template, 3, 4, "mat-form-field", 6)(6, NgxMatTimepickerFieldComponent_ngx_mat_timepicker_toggle_6_Template, 3, 3, "ngx-mat-timepicker-toggle", 7);
          ɵɵelementEnd();
          ɵɵelementStart(7, "ngx-mat-timepicker", 8, 0);
          ɵɵlistener("timeSet", function NgxMatTimepickerFieldComponent_Template_ngx_mat_timepicker_timeSet_7_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.onTimeSet($event));
          });
          ɵɵelementEnd();
          ɵɵtemplate(9, NgxMatTimepickerFieldComponent_ng_template_9_Template, 2, 0, "ng-template", null, 1, ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
          let tmp_6_0;
          let tmp_16_0;
          ɵɵproperty("ngClass", ɵɵpureFunction1(30, _c11, ctx.disabled));
          ɵɵadvance();
          ɵɵproperty("color", ctx.color)("floatLabel", ctx.floatLabel)("placeholder", "HH")("time", (tmp_6_0 = ctx.hour$.getValue()) == null ? null : tmp_6_0.time)("min", ctx.minHour)("max", ctx.maxHour)("timeUnit", ctx.timeUnit.HOUR)("disabled", ctx.disabled)("timeList", ctx.hoursList)("preventTyping", ctx.isTimeRangeSet);
          ɵɵadvance(3);
          ɵɵproperty("color", ctx.color)("floatLabel", ctx.floatLabel)("placeholder", "MM")("time", (tmp_16_0 = ctx.minute$.getValue()) == null ? null : tmp_16_0.time)("min", 0)("max", 59)("timeUnit", ctx.timeUnit.MINUTE)("disabled", ctx.disabled)("timeList", ctx.minutesList)("preventTyping", ctx.isTimeRangeSet);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.format !== 24);
          ɵɵadvance();
          ɵɵproperty("ngIf", !ctx.controlOnly);
          ɵɵadvance();
          ɵɵproperty("color", ctx.color)("min", ctx.min)("max", ctx.max)("defaultTime", ctx.timepickerTime)("format", ctx.format)("cancelBtnTmpl", ctx.cancelBtnTmpl)("confirmBtnTmpl", ctx.confirmBtnTmpl);
        }
      },
      dependencies: [NgClass, NgxMatTimepickerControlComponent, NgIf, MatFormFieldModule, MatFormField, MatSelectModule, MatSelect, MatOption, FormsModule, NgControlStatus, NgModel, NgForOf, MatOptionModule, NgxMatTimepickerToggleComponent, NgxMatTimepickerToggleIconDirective, NgTemplateOutlet, NgxMatTimepickerComponent, MatIconModule, MatIcon],
      styles: [".ngx-mat-timepicker{display:flex;align-items:center;height:100%}.ngx-mat-timepicker--disabled{background:#00000012;pointer-events:none}.ngx-mat-timepicker .separator-colon{margin-left:5px;margin-right:5px}.ngx-mat-timepicker .period-select{width:60px;min-width:60px;margin-left:8px;text-align:center}.ngx-mat-timepicker__control--first{order:1}.ngx-mat-timepicker__control--second{order:2}.ngx-mat-timepicker__control--third{order:3}.ngx-mat-timepicker__control--forth{order:4}.ngx-mat-timepicker__toggle{order:4;margin-bottom:1.5em;margin-left:4px}.ngx-mat-timepicker__toggle span.mat-button-wrapper{font-size:24px}\n"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerFieldComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-field",
      providers: [NgxMatTimepickerService, {
        provide: NG_VALUE_ACCESSOR,
        useExisting: NgxMatTimepickerFieldComponent,
        multi: true
      }],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      imports: [NgClass, NgxMatTimepickerControlComponent, NgIf, MatFormFieldModule, MatSelectModule, FormsModule, NgForOf, MatOptionModule, NgxMatTimepickerToggleComponent, NgxMatTimepickerToggleIconDirective, NgTemplateOutlet, NgxMatTimepickerComponent, MatIconModule],
      template: `<div class="ngx-mat-timepicker"
     [ngClass]="{'ngx-mat-timepicker--disabled': disabled}">
    <ngx-mat-timepicker-time-control
            class="ngx-mat-timepicker__control--first"
            [color]="color"
            [floatLabel]="floatLabel"
            [placeholder]="'HH'"
            [time]="hour$.getValue()?.time"
            [min]="minHour"
            [max]="maxHour"
            [timeUnit]="timeUnit.HOUR"
            [disabled]="disabled"
            [timeList]="hoursList"
            [preventTyping]="isTimeRangeSet"
            (timeChanged)="changeHour($event)"></ngx-mat-timepicker-time-control>
    <span class="separator-colon ngx-mat-timepicker__control--second">:</span>
    <ngx-mat-timepicker-time-control
            class="ngx-mat-timepicker__control--third"
            [color]="color"
            [floatLabel]="floatLabel"
            [placeholder]="'MM'"
            [time]="minute$.getValue()?.time"
            [min]="0"
            [max]="59"
            [timeUnit]="timeUnit.MINUTE"
            [disabled]="disabled"
            [timeList]="minutesList"
            [preventTyping]="isTimeRangeSet"
            (timeChanged)="changeMinute($event)"></ngx-mat-timepicker-time-control>
    <mat-form-field class="period-select ngx-mat-timepicker__control--forth"
                    *ngIf="format !== 24"
                    [color]="color">
        <mat-select [disabled]="disabled || isChangePeriodDisabled"
                    (selectionChange)="changePeriod($event)"
                    [ngModel]="period">
            <mat-option *ngFor="let option of periods"
                        [value]="option">{{option}}</mat-option>
        </mat-select>
    </mat-form-field>
    <ngx-mat-timepicker-toggle
            class="ngx-mat-timepicker__toggle"
            *ngIf="!controlOnly"
            [for]="timepicker"
            [disabled]="disabled">
        <span ngxMatTimepickerToggleIcon>
            <ng-container *ngTemplateOutlet="toggleIcon || defaultIcon"></ng-container>
        </span>
    </ngx-mat-timepicker-toggle>
</div>
<ngx-mat-timepicker
        [color]="color"
        [min]="min"
        [max]="max"
        [defaultTime]="timepickerTime"
        [format]="format"
        [cancelBtnTmpl]="cancelBtnTmpl"
        [confirmBtnTmpl]="confirmBtnTmpl"
        (timeSet)="onTimeSet($event)"
        #timepicker></ngx-mat-timepicker>

<ng-template #defaultIcon>
    <mat-icon>watch_later</mat-icon>
</ng-template>
`,
      styles: [".ngx-mat-timepicker{display:flex;align-items:center;height:100%}.ngx-mat-timepicker--disabled{background:#00000012;pointer-events:none}.ngx-mat-timepicker .separator-colon{margin-left:5px;margin-right:5px}.ngx-mat-timepicker .period-select{width:60px;min-width:60px;margin-left:8px;text-align:center}.ngx-mat-timepicker__control--first{order:1}.ngx-mat-timepicker__control--second{order:2}.ngx-mat-timepicker__control--third{order:3}.ngx-mat-timepicker__control--forth{order:4}.ngx-mat-timepicker__toggle{order:4;margin-bottom:1.5em;margin-left:4px}.ngx-mat-timepicker__toggle span.mat-button-wrapper{font-size:24px}\n"]
    }]
  }], () => [{
    type: NgxMatTimepickerService
  }, {
    type: NgxMatTimepickerLocaleService
  }], {
    color: [{
      type: Input
    }],
    defaultTime: [{
      type: Input
    }],
    floatLabel: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    cancelBtnTmpl: [{
      type: Input
    }],
    confirmBtnTmpl: [{
      type: Input
    }],
    controlOnly: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    timeChanged: [{
      type: Output
    }],
    toggleIcon: [{
      type: Input
    }]
  });
})();
var NgxMatTimepickerDirective = class _NgxMatTimepickerDirective {
  get element() {
    return this._elementRef && this._elementRef.nativeElement;
  }
  get format() {
    return this._format;
  }
  set format(value) {
    this._format = NgxMatTimepickerAdapter.isTwentyFour(+value) ? 24 : 12;
    const isDynamicallyChanged = value && this._previousFormat && this._previousFormat !== this._format;
    if (isDynamicallyChanged) {
      this.value = this._value;
      this._timepicker.updateTime(this._value);
    }
    this._previousFormat = this._format;
  }
  get max() {
    return this._max;
  }
  set max(value) {
    if (typeof value === "string") {
      this._max = NgxMatTimepickerAdapter.parseTime(value, {
        locale: this._locale,
        format: this.format
      });
      return;
    }
    this._max = value;
  }
  get min() {
    return this._min;
  }
  set min(value) {
    if (typeof value === "string") {
      this._min = NgxMatTimepickerAdapter.parseTime(value, {
        locale: this._locale,
        format: this.format
      });
      return;
    }
    this._min = value;
  }
  set timepicker(picker) {
    this._registerTimepicker(picker);
  }
  get value() {
    if (!this._value) {
      return "";
    }
    return NgxMatTimepickerAdapter.toLocaleTimeString(this._value, {
      format: this.format,
      locale: this._locale
    });
  }
  set value(value) {
    if (!value) {
      this._value = "";
      this._updateInputValue();
      return;
    }
    const time = NgxMatTimepickerAdapter.formatTime(value, {
      locale: this._locale,
      format: this.format
    });
    const isAvailable = NgxMatTimepickerAdapter.isTimeAvailable(time, this._min, this._max, "minutes", this._timepicker.minutesGap, this._format);
    if (isAvailable) {
      this._value = time;
      this._updateInputValue();
      return;
    }
    console.warn("Selected time doesn't match min or max value");
  }
  set _defaultTime(time) {
    this._timepicker.defaultTime = NgxMatTimepickerAdapter.formatTime(time, {
      locale: this._locale,
      format: this.format
    });
  }
  get _locale() {
    return this._timepickerLocaleSrv.locale;
  }
  constructor(_elementRef, _timepickerLocaleSrv, _matFormField) {
    this._elementRef = _elementRef;
    this._timepickerLocaleSrv = _timepickerLocaleSrv;
    this._matFormField = _matFormField;
    this.cdkOverlayOrigin = new CdkOverlayOrigin(this._matFormField ? this._matFormField.getConnectedOverlayOrigin() : this._elementRef);
    this._format = 12;
    this._subsCtrl$ = new Subject();
    this._value = "";
    this.onTouched = () => {
    };
    this._onChange = () => {
    };
  }
  ngOnChanges(changes) {
    const vChanges = changes["value"];
    if (vChanges && vChanges.currentValue) {
      this._defaultTime = vChanges.currentValue;
    }
  }
  ngOnDestroy() {
    this._unregisterTimepicker();
    this._subsCtrl$.next();
    this._subsCtrl$.complete();
  }
  onClick(event) {
    if (!this.disableClick) {
      this._timepicker.open();
      event.stopPropagation();
    }
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  updateValue(e) {
    this.value = e.target.value;
    this._onChange(this.value);
  }
  writeValue(value) {
    this.value = value;
    if (value) {
      this._defaultTime = value;
    }
  }
  _registerTimepicker(picker) {
    if (picker) {
      this._timepicker = picker;
      this._timepicker.registerInput(this);
      this._timepicker.timeSet.pipe(takeUntil(this._subsCtrl$)).subscribe((time) => {
        this.value = time;
        this._onChange(this.value);
        this.onTouched();
        this._defaultTime = this._value;
      });
    } else {
      throw new Error("NgxMatTimepickerComponent is not defined. Please make sure you passed the timepicker to ngxMatTimepicker directive");
    }
  }
  _unregisterTimepicker() {
    if (this._timepicker) {
      this._timepicker.unregisterInput();
    }
  }
  _updateInputValue() {
    this._elementRef.nativeElement.value = this.value;
  }
  static {
    this.ɵfac = function NgxMatTimepickerDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgxMatTimepickerLocaleService), ɵɵdirectiveInject(MatFormField, 8));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NgxMatTimepickerDirective,
      selectors: [["", "ngxMatTimepicker", ""]],
      hostVars: 2,
      hostBindings: function NgxMatTimepickerDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("blur", function NgxMatTimepickerDirective_blur_HostBindingHandler() {
            return ctx.onTouched();
          })("click", function NgxMatTimepickerDirective_click_HostBindingHandler($event) {
            return ctx.onClick($event);
          })("change", function NgxMatTimepickerDirective_change_HostBindingHandler($event) {
            return ctx.updateValue($event);
          });
        }
        if (rf & 2) {
          ɵɵhostProperty("disabled", ctx.disabled);
          ɵɵattribute("cdkOverlayOrigin", ctx.cdkOverlayOrigin);
        }
      },
      inputs: {
        format: "format",
        max: "max",
        min: "min",
        timepicker: [0, "ngxMatTimepicker", "timepicker"],
        value: "value",
        disableClick: "disableClick",
        disabled: "disabled"
      },
      standalone: true,
      features: [ɵɵProvidersFeature([{
        provide: NG_VALUE_ACCESSOR,
        useExisting: _NgxMatTimepickerDirective,
        multi: true
      }]), ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxMatTimepicker]",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: NgxMatTimepickerDirective,
        multi: true
      }],
      // tslint:disable-next-line:no-host-metadata-property
      host: {
        "[disabled]": "disabled",
        "(blur)": "onTouched()"
      },
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgxMatTimepickerLocaleService
  }, {
    type: MatFormField,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MatFormField]
    }]
  }], {
    format: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    timepicker: [{
      type: Input,
      args: ["ngxMatTimepicker"]
    }],
    value: [{
      type: Input
    }],
    cdkOverlayOrigin: [{
      type: HostBinding,
      args: ["attr.cdkOverlayOrigin"]
    }],
    disableClick: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }],
    updateValue: [{
      type: HostListener,
      args: ["change", ["$event"]]
    }]
  });
})();
var NgxMatTimepickerTimeFormatterPipe = class _NgxMatTimepickerTimeFormatterPipe {
  transform(time, timeUnit) {
    if (time == null || time === "") {
      return time;
    }
    switch (timeUnit) {
      case NgxMatTimepickerUnits.HOUR:
        return import_ts_luxon.DateTime.fromObject({
          hour: +time
        }).toFormat("HH");
      case NgxMatTimepickerUnits.MINUTE:
        return import_ts_luxon.DateTime.fromObject({
          minute: +time
        }).toFormat("mm");
      default:
        throw new Error("no such time unit");
    }
  }
  static {
    this.ɵfac = function NgxMatTimepickerTimeFormatterPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerTimeFormatterPipe)();
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "timeFormatter",
      type: _NgxMatTimepickerTimeFormatterPipe,
      pure: true,
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerTimeFormatterPipe, [{
    type: Pipe,
    args: [{
      name: "timeFormatter",
      standalone: true
    }]
  }], null, null);
})();
var NgxMatTimepickerModule = class _NgxMatTimepickerModule {
  static setLocale(locale) {
    return {
      ngModule: _NgxMatTimepickerModule,
      providers: [{
        provide: NGX_MAT_TIMEPICKER_LOCALE,
        useValue: locale
      }, {
        provide: NGX_MAT_TIMEPICKER_CONFIG,
        useValue: void 0
      }, NgxMatTimepickerLocaleService]
    };
  }
  static {
    this.ɵfac = function NgxMatTimepickerModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxMatTimepickerModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NgxMatTimepickerModule,
      imports: [
        CommonModule,
        A11yModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        MatIconModule,
        OverlayModule,
        PortalModule,
        // Not really used, but needed to use it as abstract class
        NgxMatTimepickerBaseDirective,
        NgxMatTimepickerHoursFaceDirective,
        //
        NgxMatTimepickerActiveHourPipe,
        NgxMatTimepickerActiveMinutePipe,
        NgxMatTimepickerComponent,
        NgxMatTimepickerDialComponent,
        NgxMatTimepickerDialControlComponent,
        NgxMatTimepickerDialogComponent,
        NgxMatTimepickerDirective,
        NgxMatTimepickerFaceComponent,
        NgxMatTimepickerMinutesFaceComponent,
        NgxMatTimepickerPeriodComponent,
        NgxMatTimepickerStandaloneComponent,
        NgxMatTimepickerToggleComponent,
        NgxMatTimepicker12HoursFaceComponent,
        NgxMatTimepicker24HoursFaceComponent,
        NgxMatTimepickerToggleIconDirective,
        NgxMatTimepickerAutofocusDirective,
        NgxMatTimepickerMinutesFormatterPipe,
        NgxMatTimepickerFieldComponent,
        NgxMatTimepickerControlComponent,
        NgxMatTimepickerParserPipe,
        NgxMatTimepickerContentComponent,
        NgxMatTimepickerTimeFormatterPipe,
        NgxMatTimepickerTimeLocalizerPipe
      ],
      exports: [NgxMatTimepickerComponent, NgxMatTimepickerToggleComponent, NgxMatTimepickerFieldComponent, NgxMatTimepickerDirective, NgxMatTimepickerToggleIconDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [NgxMatTimepickerLocaleService, {
        provide: MAT_FAB_DEFAULT_OPTIONS,
        useValue: {
          color: "void"
        }
      }],
      imports: [CommonModule, A11yModule, FormsModule, MatButtonModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatSelectModule, MatToolbarModule, MatIconModule, OverlayModule, PortalModule, NgxMatTimepickerComponent, NgxMatTimepickerDialComponent, NgxMatTimepickerDialControlComponent, NgxMatTimepickerDialogComponent, NgxMatTimepickerFaceComponent, NgxMatTimepickerMinutesFaceComponent, NgxMatTimepickerStandaloneComponent, NgxMatTimepickerToggleComponent, NgxMatTimepicker12HoursFaceComponent, NgxMatTimepicker24HoursFaceComponent, NgxMatTimepickerFieldComponent, NgxMatTimepickerControlComponent]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerModule, [{
    type: NgModule,
    args: [{
      imports: [
        CommonModule,
        A11yModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        MatIconModule,
        OverlayModule,
        PortalModule,
        // Not really used, but needed to use it as abstract class
        NgxMatTimepickerBaseDirective,
        NgxMatTimepickerHoursFaceDirective,
        //
        NgxMatTimepickerActiveHourPipe,
        NgxMatTimepickerActiveMinutePipe,
        NgxMatTimepickerComponent,
        NgxMatTimepickerDialComponent,
        NgxMatTimepickerDialControlComponent,
        NgxMatTimepickerDialogComponent,
        NgxMatTimepickerDirective,
        NgxMatTimepickerFaceComponent,
        NgxMatTimepickerMinutesFaceComponent,
        NgxMatTimepickerPeriodComponent,
        NgxMatTimepickerStandaloneComponent,
        NgxMatTimepickerToggleComponent,
        NgxMatTimepicker12HoursFaceComponent,
        NgxMatTimepicker24HoursFaceComponent,
        NgxMatTimepickerToggleIconDirective,
        NgxMatTimepickerAutofocusDirective,
        NgxMatTimepickerMinutesFormatterPipe,
        NgxMatTimepickerFieldComponent,
        NgxMatTimepickerControlComponent,
        NgxMatTimepickerParserPipe,
        NgxMatTimepickerContentComponent,
        NgxMatTimepickerTimeFormatterPipe,
        NgxMatTimepickerTimeLocalizerPipe
      ],
      exports: [NgxMatTimepickerComponent, NgxMatTimepickerToggleComponent, NgxMatTimepickerFieldComponent, NgxMatTimepickerDirective, NgxMatTimepickerToggleIconDirective],
      providers: [NgxMatTimepickerLocaleService, {
        provide: MAT_FAB_DEFAULT_OPTIONS,
        useValue: {
          color: "void"
        }
      }]
    }]
  }], null, null);
})();
export {
  NgxMatTimepickerComponent,
  NgxMatTimepickerDirective,
  NgxMatTimepickerFieldComponent,
  NgxMatTimepickerLocaleService,
  NgxMatTimepickerModule,
  NgxMatTimepickerToggleComponent,
  NgxMatTimepickerToggleIconDirective
};
//# sourceMappingURL=ngx-mat-timepicker.js.map
