import {
  MatSelect
} from "./chunk-QTALXMGE.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-PALWEWVW.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-CGG2ESVG.js";
import "./chunk-2EJFHX3U.js";
import "./chunk-Q62MEOYD.js";
import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-FZUDBEXO.js";
import {
  MatFormField
} from "./chunk-KMV2CMOS.js";
import {
  ViewportRuler
} from "./chunk-GLKTJXDH.js";
import "./chunk-ZLWDEUY6.js";
import "./chunk-DIOVROW2.js";
import {
  MatButtonModule,
  MatIconButton
} from "./chunk-GLKC3XVZ.js";
import {
  DefaultValueAccessor,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  ReactiveFormsModule
} from "./chunk-EYC6H3ZZ.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-AKKHCKB5.js";
import {
  MatCommonModule,
  MatOption
} from "./chunk-25W7ATLI.js";
import {
  AsyncPipe,
  CommonModule,
  NgClass,
  NgIf,
  NgTemplateOutlet
} from "./chunk-AJRZKXTD.js";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  NgModule,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation$1,
  forwardRef,
  numberAttribute,
  setClassMetadata,
  ɵɵInputTransformsFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction2,
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
} from "./chunk-MQCZQP5K.js";
import "./chunk-5AZMPBFP.js";
import "./chunk-KT3NRA3D.js";
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  delay,
  filter,
  map,
  of,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap
} from "./chunk-FMZF26QI.js";
import "./chunk-ZGWC6NTF.js";

// node_modules/@angular/material/fesm2022/progress-spinner.mjs
var _c0 = ["determinateSpinner"];
function MatProgressSpinner_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 11);
    ɵɵelement(1, "circle", 12);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵattribute("viewBox", ctx_r0._viewBox());
    ɵɵadvance();
    ɵɵstyleProp("stroke-dasharray", ctx_r0._strokeCircumference(), "px")("stroke-dashoffset", ctx_r0._strokeCircumference() / 2, "px")("stroke-width", ctx_r0._circleStrokeWidth(), "%");
    ɵɵattribute("r", ctx_r0._circleRadius());
  }
}
var MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS = new InjectionToken("mat-progress-spinner-default-options", {
  providedIn: "root",
  factory: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY
});
function MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY() {
  return {
    diameter: BASE_SIZE
  };
}
var BASE_SIZE = 100;
var BASE_STROKE_WIDTH = 10;
var MatProgressSpinner = class _MatProgressSpinner {
  // TODO: should be typed as `ThemePalette` but internal apps pass in arbitrary strings.
  /**
   * Theme color of the progress spinner. This API is supported in M2 themes only, it
   * has no effect in M3 themes.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.io/guide/theming#using-component-color-variants.
   */
  get color() {
    return this._color || this._defaultColor;
  }
  set color(value) {
    this._color = value;
  }
  constructor(_elementRef, animationMode, defaults) {
    this._elementRef = _elementRef;
    this._defaultColor = "primary";
    this._value = 0;
    this._diameter = BASE_SIZE;
    this._noopAnimations = animationMode === "NoopAnimations" && !!defaults && !defaults._forceAnimations;
    this.mode = _elementRef.nativeElement.nodeName.toLowerCase() === "mat-spinner" ? "indeterminate" : "determinate";
    if (defaults) {
      if (defaults.color) {
        this.color = this._defaultColor = defaults.color;
      }
      if (defaults.diameter) {
        this.diameter = defaults.diameter;
      }
      if (defaults.strokeWidth) {
        this.strokeWidth = defaults.strokeWidth;
      }
    }
  }
  /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
  get value() {
    return this.mode === "determinate" ? this._value : 0;
  }
  set value(v) {
    this._value = Math.max(0, Math.min(100, v || 0));
  }
  /** The diameter of the progress spinner (will set width and height of svg). */
  get diameter() {
    return this._diameter;
  }
  set diameter(size) {
    this._diameter = size || 0;
  }
  /** Stroke width of the progress spinner. */
  get strokeWidth() {
    return this._strokeWidth ?? this.diameter / 10;
  }
  set strokeWidth(value) {
    this._strokeWidth = value || 0;
  }
  /** The radius of the spinner, adjusted for stroke width. */
  _circleRadius() {
    return (this.diameter - BASE_STROKE_WIDTH) / 2;
  }
  /** The view box of the spinner's svg element. */
  _viewBox() {
    const viewBox = this._circleRadius() * 2 + this.strokeWidth;
    return `0 0 ${viewBox} ${viewBox}`;
  }
  /** The stroke circumference of the svg circle. */
  _strokeCircumference() {
    return 2 * Math.PI * this._circleRadius();
  }
  /** The dash offset of the svg circle. */
  _strokeDashOffset() {
    if (this.mode === "determinate") {
      return this._strokeCircumference() * (100 - this._value) / 100;
    }
    return null;
  }
  /** Stroke width of the circle in percent. */
  _circleStrokeWidth() {
    return this.strokeWidth / this.diameter * 100;
  }
  static {
    this.ɵfac = function MatProgressSpinner_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatProgressSpinner)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ANIMATION_MODULE_TYPE, 8), ɵɵdirectiveInject(MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MatProgressSpinner,
      selectors: [["mat-progress-spinner"], ["mat-spinner"]],
      viewQuery: function MatProgressSpinner_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(_c0, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._determinateCircle = _t.first);
        }
      },
      hostAttrs: ["role", "progressbar", "tabindex", "-1", 1, "mat-mdc-progress-spinner", "mdc-circular-progress"],
      hostVars: 18,
      hostBindings: function MatProgressSpinner_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("aria-valuemin", 0)("aria-valuemax", 100)("aria-valuenow", ctx.mode === "determinate" ? ctx.value : null)("mode", ctx.mode);
          ɵɵclassMap("mat-" + ctx.color);
          ɵɵstyleProp("width", ctx.diameter, "px")("height", ctx.diameter, "px")("--mdc-circular-progress-size", ctx.diameter + "px")("--mdc-circular-progress-active-indicator-width", ctx.diameter + "px");
          ɵɵclassProp("_mat-animation-noopable", ctx._noopAnimations)("mdc-circular-progress--indeterminate", ctx.mode === "indeterminate");
        }
      },
      inputs: {
        color: "color",
        mode: "mode",
        value: [2, "value", "value", numberAttribute],
        diameter: [2, "diameter", "diameter", numberAttribute],
        strokeWidth: [2, "strokeWidth", "strokeWidth", numberAttribute]
      },
      exportAs: ["matProgressSpinner"],
      standalone: true,
      features: [ɵɵInputTransformsFeature, ɵɵStandaloneFeature],
      decls: 14,
      vars: 11,
      consts: [["circle", ""], ["determinateSpinner", ""], ["aria-hidden", "true", 1, "mdc-circular-progress__determinate-container"], ["xmlns", "http://www.w3.org/2000/svg", "focusable", "false", 1, "mdc-circular-progress__determinate-circle-graphic"], ["cx", "50%", "cy", "50%", 1, "mdc-circular-progress__determinate-circle"], ["aria-hidden", "true", 1, "mdc-circular-progress__indeterminate-container"], [1, "mdc-circular-progress__spinner-layer"], [1, "mdc-circular-progress__circle-clipper", "mdc-circular-progress__circle-left"], [3, "ngTemplateOutlet"], [1, "mdc-circular-progress__gap-patch"], [1, "mdc-circular-progress__circle-clipper", "mdc-circular-progress__circle-right"], ["xmlns", "http://www.w3.org/2000/svg", "focusable", "false", 1, "mdc-circular-progress__indeterminate-circle-graphic"], ["cx", "50%", "cy", "50%"]],
      template: function MatProgressSpinner_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, MatProgressSpinner_ng_template_0_Template, 2, 8, "ng-template", null, 0, ɵɵtemplateRefExtractor);
          ɵɵelementStart(2, "div", 2, 1);
          ɵɵnamespaceSVG();
          ɵɵelementStart(4, "svg", 3);
          ɵɵelement(5, "circle", 4);
          ɵɵelementEnd()();
          ɵɵnamespaceHTML();
          ɵɵelementStart(6, "div", 5)(7, "div", 6)(8, "div", 7);
          ɵɵelementContainer(9, 8);
          ɵɵelementEnd();
          ɵɵelementStart(10, "div", 9);
          ɵɵelementContainer(11, 8);
          ɵɵelementEnd();
          ɵɵelementStart(12, "div", 10);
          ɵɵelementContainer(13, 8);
          ɵɵelementEnd()()();
        }
        if (rf & 2) {
          const circle_r2 = ɵɵreference(1);
          ɵɵadvance(4);
          ɵɵattribute("viewBox", ctx._viewBox());
          ɵɵadvance();
          ɵɵstyleProp("stroke-dasharray", ctx._strokeCircumference(), "px")("stroke-dashoffset", ctx._strokeDashOffset(), "px")("stroke-width", ctx._circleStrokeWidth(), "%");
          ɵɵattribute("r", ctx._circleRadius());
          ɵɵadvance(4);
          ɵɵproperty("ngTemplateOutlet", circle_r2);
          ɵɵadvance(2);
          ɵɵproperty("ngTemplateOutlet", circle_r2);
          ɵɵadvance(2);
          ɵɵproperty("ngTemplateOutlet", circle_r2);
        }
      },
      dependencies: [NgTemplateOutlet],
      styles: [".mat-mdc-progress-spinner{display:block;overflow:hidden;line-height:0;position:relative;direction:ltr;transition:opacity 250ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-spinner circle{stroke-width:var(--mdc-circular-progress-active-indicator-width)}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1;animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mdc-circular-progress-active-indicator-color, var(--mat-app-primary))}.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatProgressSpinner, [{
    type: Component,
    args: [{
      selector: "mat-progress-spinner, mat-spinner",
      exportAs: "matProgressSpinner",
      host: {
        "role": "progressbar",
        "class": "mat-mdc-progress-spinner mdc-circular-progress",
        // set tab index to -1 so screen readers will read the aria-label
        // Note: there is a known issue with JAWS that does not read progressbar aria labels on FireFox
        "tabindex": "-1",
        "[class]": '"mat-" + color',
        "[class._mat-animation-noopable]": `_noopAnimations`,
        "[class.mdc-circular-progress--indeterminate]": 'mode === "indeterminate"',
        "[style.width.px]": "diameter",
        "[style.height.px]": "diameter",
        "[style.--mdc-circular-progress-size]": 'diameter + "px"',
        "[style.--mdc-circular-progress-active-indicator-width]": 'diameter + "px"',
        "[attr.aria-valuemin]": "0",
        "[attr.aria-valuemax]": "100",
        "[attr.aria-valuenow]": 'mode === "determinate" ? value : null',
        "[attr.mode]": "mode"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      standalone: true,
      imports: [NgTemplateOutlet],
      template: '<ng-template #circle>\n  <svg [attr.viewBox]="_viewBox()" class="mdc-circular-progress__indeterminate-circle-graphic"\n       xmlns="http://www.w3.org/2000/svg" focusable="false">\n    <circle [attr.r]="_circleRadius()"\n            [style.stroke-dasharray.px]="_strokeCircumference()"\n            [style.stroke-dashoffset.px]="_strokeCircumference() / 2"\n            [style.stroke-width.%]="_circleStrokeWidth()"\n            cx="50%" cy="50%"/>\n  </svg>\n</ng-template>\n\n<!--\n  All children need to be hidden for screen readers in order to support ChromeVox.\n  More context in the issue: https://github.com/angular/components/issues/22165.\n-->\n<div class="mdc-circular-progress__determinate-container" aria-hidden="true" #determinateSpinner>\n  <svg [attr.viewBox]="_viewBox()" class="mdc-circular-progress__determinate-circle-graphic"\n       xmlns="http://www.w3.org/2000/svg" focusable="false">\n    <circle [attr.r]="_circleRadius()"\n            [style.stroke-dasharray.px]="_strokeCircumference()"\n            [style.stroke-dashoffset.px]="_strokeDashOffset()"\n            [style.stroke-width.%]="_circleStrokeWidth()"\n            class="mdc-circular-progress__determinate-circle"\n            cx="50%" cy="50%"/>\n  </svg>\n</div>\n<!--TODO: figure out why there are 3 separate svgs-->\n<div class="mdc-circular-progress__indeterminate-container" aria-hidden="true">\n  <div class="mdc-circular-progress__spinner-layer">\n    <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">\n      <ng-container [ngTemplateOutlet]="circle"></ng-container>\n    </div>\n    <div class="mdc-circular-progress__gap-patch">\n      <ng-container [ngTemplateOutlet]="circle"></ng-container>\n    </div>\n    <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">\n      <ng-container [ngTemplateOutlet]="circle"></ng-container>\n    </div>\n  </div>\n</div>\n',
      styles: [".mat-mdc-progress-spinner{display:block;overflow:hidden;line-height:0;position:relative;direction:ltr;transition:opacity 250ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-spinner circle{stroke-width:var(--mdc-circular-progress-active-indicator-width)}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1;animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mdc-circular-progress-active-indicator-color, var(--mat-app-primary))}.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}"]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ANIMATION_MODULE_TYPE]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS]
    }]
  }], {
    color: [{
      type: Input
    }],
    _determinateCircle: [{
      type: ViewChild,
      args: ["determinateSpinner"]
    }],
    mode: [{
      type: Input
    }],
    value: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    diameter: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    strokeWidth: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }]
  });
})();
var MatSpinner = MatProgressSpinner;
var MatProgressSpinnerModule = class _MatProgressSpinnerModule {
  static {
    this.ɵfac = function MatProgressSpinnerModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatProgressSpinnerModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _MatProgressSpinnerModule,
      imports: [CommonModule, MatProgressSpinner, MatSpinner],
      exports: [MatProgressSpinner, MatSpinner, MatCommonModule]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [CommonModule, MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatProgressSpinnerModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, MatProgressSpinner, MatSpinner],
      exports: [MatProgressSpinner, MatSpinner, MatCommonModule]
    }]
  }], null, null);
})();

// node_modules/ngx-mat-select-search/fesm2020/ngx-mat-select-search.mjs
var _c02 = ["searchSelectInput"];
var _c1 = ["innerSelectSearch"];
var _c2 = [[["", 8, "mat-select-search-custom-header-content"]], [["", "ngxMatSelectSearchClear", ""]], [["", "ngxMatSelectNoEntriesFound", ""]]];
var _c3 = [".mat-select-search-custom-header-content", "[ngxMatSelectSearchClear]", "[ngxMatSelectNoEntriesFound]"];
var _c4 = (a0, a1) => ({
  "mat-select-search-inner-multiple": a0,
  "mat-select-search-inner-toggle-all": a1
});
function MatSelectSearchComponent_mat_checkbox_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "mat-checkbox", 12);
    ɵɵlistener("change", function MatSelectSearchComponent_mat_checkbox_4_Template_mat_checkbox_change_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2._emitSelectAllBooleanToParent($event.checked));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("color", ctx_r2.matFormField == null ? null : ctx_r2.matFormField.color)("checked", ctx_r2.toggleAllCheckboxChecked)("indeterminate", ctx_r2.toggleAllCheckboxIndeterminate)("matTooltip", ctx_r2.toggleAllCheckboxTooltipMessage)("matTooltipPosition", ctx_r2.toggleAllCheckboxTooltipPosition);
  }
}
function MatSelectSearchComponent_mat_spinner_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "mat-spinner", 13);
  }
}
function MatSelectSearchComponent_button_8_ng_content_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 1, ["*ngIf", "clearIcon; else defaultIcon"]);
  }
}
function MatSelectSearchComponent_button_8_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-icon", 16);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("svgIcon", ctx_r2.closeSvgIcon);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", !ctx_r2.closeSvgIcon ? ctx_r2.closeIcon : null, " ");
  }
}
function MatSelectSearchComponent_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 14);
    ɵɵlistener("click", function MatSelectSearchComponent_button_8_Template_button_click_0_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2._reset(true));
    });
    ɵɵtemplate(1, MatSelectSearchComponent_button_8_ng_content_1_Template, 1, 0, "ng-content", 15)(2, MatSelectSearchComponent_button_8_ng_template_2_Template, 2, 2, "ng-template", null, 2, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const defaultIcon_r5 = ɵɵreference(3);
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.clearIcon)("ngIfElse", defaultIcon_r5);
  }
}
function MatSelectSearchComponent_div_11_ng_content_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 2, ["*ngIf", "noEntriesFound; else defaultNoEntriesFound"]);
  }
}
function MatSelectSearchComponent_div_11_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵtextInterpolate(ctx_r2.noEntriesFoundLabel);
  }
}
function MatSelectSearchComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 17);
    ɵɵtemplate(1, MatSelectSearchComponent_div_11_ng_content_1_Template, 1, 0, "ng-content", 15)(2, MatSelectSearchComponent_div_11_ng_template_2_Template, 1, 1, "ng-template", null, 3, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const defaultNoEntriesFound_r6 = ɵɵreference(3);
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.noEntriesFound)("ngIfElse", defaultNoEntriesFound_r6);
  }
}
var MatSelectSearchClearDirective = class {
};
MatSelectSearchClearDirective.ɵfac = function MatSelectSearchClearDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MatSelectSearchClearDirective)();
};
MatSelectSearchClearDirective.ɵdir = ɵɵdefineDirective({
  type: MatSelectSearchClearDirective,
  selectors: [["", "ngxMatSelectSearchClear", ""]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSelectSearchClearDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxMatSelectSearchClear]"
    }]
  }], null, null);
})();
var configurableDefaultOptions = ["ariaLabel", "clearSearchInput", "closeIcon", "closeSvgIcon", "disableInitialFocus", "disableScrollToActiveOnOptionsChanged", "enableClearOnEscapePressed", "hideClearSearchButton", "noEntriesFoundLabel", "placeholderLabel", "preventHomeEndKeyPropagation", "searching"];
var MAT_SELECTSEARCH_DEFAULT_OPTIONS = new InjectionToken("mat-selectsearch-default-options");
var MatSelectNoEntriesFoundDirective = class {
};
MatSelectNoEntriesFoundDirective.ɵfac = function MatSelectNoEntriesFoundDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MatSelectNoEntriesFoundDirective)();
};
MatSelectNoEntriesFoundDirective.ɵdir = ɵɵdefineDirective({
  type: MatSelectNoEntriesFoundDirective,
  selectors: [["", "ngxMatSelectNoEntriesFound", ""]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSelectNoEntriesFoundDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxMatSelectNoEntriesFound]"
    }]
  }], null, null);
})();
var MatSelectSearchComponent = class {
  constructor(matSelect, changeDetectorRef, _viewportRuler, matOption, matFormField, defaultOptions) {
    this.matSelect = matSelect;
    this.changeDetectorRef = changeDetectorRef;
    this._viewportRuler = _viewportRuler;
    this.matOption = matOption;
    this.matFormField = matFormField;
    this.placeholderLabel = "Suche";
    this.type = "text";
    this.closeIcon = "close";
    this.noEntriesFoundLabel = "Keine Optionen gefunden";
    this.clearSearchInput = true;
    this.searching = false;
    this.disableInitialFocus = false;
    this.enableClearOnEscapePressed = false;
    this.preventHomeEndKeyPropagation = false;
    this.disableScrollToActiveOnOptionsChanged = false;
    this.ariaLabel = "dropdown search";
    this.showToggleAllCheckbox = false;
    this.toggleAllCheckboxChecked = false;
    this.toggleAllCheckboxIndeterminate = false;
    this.toggleAllCheckboxTooltipMessage = "";
    this.toggleAllCheckboxTooltipPosition = "below";
    this.hideClearSearchButton = false;
    this.alwaysRestoreSelectedOptionsMulti = false;
    this.recreateValuesArray = false;
    this.toggleAll = new EventEmitter();
    this.onTouched = (_) => {
    };
    this._options$ = new BehaviorSubject(null);
    this.optionsList$ = this._options$.pipe(switchMap((_options) => _options ? _options.changes.pipe(map((options) => options.toArray()), startWith(_options.toArray())) : of(null)));
    this.optionsLength$ = this.optionsList$.pipe(map((options) => options ? options.length : 0));
    this._formControl = new FormControl("", {
      nonNullable: true
    });
    this._showNoEntriesFound$ = combineLatest([this._formControl.valueChanges, this.optionsLength$]).pipe(map(([value, optionsLength]) => !!(this.noEntriesFoundLabel && value && optionsLength === this.getOptionsLengthOffset())));
    this._onDestroy = new Subject();
    this.applyDefaultOptions(defaultOptions);
  }
  /** Current search value */
  get value() {
    return this._formControl.value;
  }
  /** Reference to the MatSelect options */
  set _options(_options) {
    this._options$.next(_options);
  }
  get _options() {
    return this._options$.getValue();
  }
  applyDefaultOptions(defaultOptions) {
    if (!defaultOptions) {
      return;
    }
    for (const key of configurableDefaultOptions) {
      if (defaultOptions.hasOwnProperty(key)) {
        this[key] = defaultOptions[key];
      }
    }
  }
  ngOnInit() {
    if (this.matOption) {
      this.matOption.disabled = true;
      this.matOption._getHostElement().classList.add("contains-mat-select-search");
      this.matOption._getHostElement().setAttribute("role", "presentation");
    } else {
      console.error("<ngx-mat-select-search> must be placed inside a <mat-option> element");
    }
    this.matSelect.openedChange.pipe(delay(1), takeUntil(this._onDestroy)).subscribe((opened) => {
      if (opened) {
        this.updateInputWidth();
        if (!this.disableInitialFocus) {
          this._focus();
        }
      } else {
        if (this.clearSearchInput) {
          this._reset();
        }
      }
    });
    this.matSelect.openedChange.pipe(take(1), switchMap((_) => {
      this._options = this.matSelect.options;
      let previousFirstOption = this._options.toArray()[this.getOptionsLengthOffset()];
      return this._options.changes.pipe(tap(() => {
        setTimeout(() => {
          const options = this._options.toArray();
          const currentFirstOption = options[this.getOptionsLengthOffset()];
          const keyManager = this.matSelect._keyManager;
          if (keyManager && this.matSelect.panelOpen && currentFirstOption) {
            const firstOptionIsChanged = !previousFirstOption || !this.matSelect.compareWith(previousFirstOption.value, currentFirstOption.value);
            if (firstOptionIsChanged || !keyManager.activeItem || !options.find((option) => this.matSelect.compareWith(option.value, keyManager.activeItem?.value))) {
              keyManager.setActiveItem(this.getOptionsLengthOffset());
            }
            setTimeout(() => {
              this.updateInputWidth();
            });
          }
          previousFirstOption = currentFirstOption;
        });
      }));
    })).pipe(takeUntil(this._onDestroy)).subscribe();
    this._showNoEntriesFound$.pipe(takeUntil(this._onDestroy)).subscribe((showNoEntriesFound) => {
      if (this.matOption) {
        if (showNoEntriesFound) {
          this.matOption._getHostElement().classList.add("mat-select-search-no-entries-found");
        } else {
          this.matOption._getHostElement().classList.remove("mat-select-search-no-entries-found");
        }
      }
    });
    this._viewportRuler.change().pipe(takeUntil(this._onDestroy)).subscribe(() => {
      if (this.matSelect.panelOpen) {
        this.updateInputWidth();
      }
    });
    this.initMultipleHandling();
    this.optionsList$.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }
  _emitSelectAllBooleanToParent(state) {
    this.toggleAll.emit(state);
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  _isToggleAllCheckboxVisible() {
    return this.matSelect.multiple && this.showToggleAllCheckbox;
  }
  /**
   * Handles the key down event with MatSelect.
   * Allows e.g. selecting with enter key, navigation with arrow keys, etc.
   * @param event
   */
  _handleKeydown(event) {
    if (event.key && event.key.length === 1 || this.preventHomeEndKeyPropagation && (event.key === "Home" || event.key === "End")) {
      event.stopPropagation();
    }
    if (this.matSelect.multiple && event.key && event.key === "Enter") {
      setTimeout(() => this._focus());
    }
    if (this.enableClearOnEscapePressed && event.key === "Escape" && this.value) {
      this._reset(true);
      event.stopPropagation();
    }
  }
  /**
   * Handles the key up event with MatSelect.
   * Allows e.g. the announcing of the currently activeDescendant by screen readers.
   */
  _handleKeyup(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      const ariaActiveDescendantId = this.matSelect._getAriaActiveDescendant();
      const index = this._options.toArray().findIndex((item) => item.id === ariaActiveDescendantId);
      if (index !== -1) {
        this.unselectActiveDescendant();
        this.activeDescendant = this._options.toArray()[index]._getHostElement();
        this.activeDescendant.setAttribute("aria-selected", "true");
        this.searchSelectInput.nativeElement.setAttribute("aria-activedescendant", ariaActiveDescendantId);
      }
    }
  }
  writeValue(value) {
    this._lastExternalInputValue = value;
    this._formControl.setValue(value);
    this.changeDetectorRef.markForCheck();
  }
  onBlur() {
    this.unselectActiveDescendant();
    this.onTouched();
  }
  registerOnChange(fn) {
    this._formControl.valueChanges.pipe(filter((value) => value !== this._lastExternalInputValue), tap(() => this._lastExternalInputValue = void 0), takeUntil(this._onDestroy)).subscribe(fn);
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  /**
   * Focuses the search input field
   */
  _focus() {
    if (!this.searchSelectInput || !this.matSelect.panel) {
      return;
    }
    const panel = this.matSelect.panel.nativeElement;
    const scrollTop = panel.scrollTop;
    this.searchSelectInput.nativeElement.focus();
    panel.scrollTop = scrollTop;
  }
  /**
   * Resets the current search value
   * @param focus whether to focus after resetting
   */
  _reset(focus) {
    this._formControl.setValue("");
    if (focus) {
      this._focus();
    }
  }
  /**
   * Initializes handling <mat-select [multiple]="true">
   * Note: to improve this code, mat-select should be extended to allow disabling resetting the selection while filtering.
   */
  initMultipleHandling() {
    if (!this.matSelect.ngControl) {
      if (this.matSelect.multiple) {
        console.error("the mat-select containing ngx-mat-select-search must have a ngModel or formControl directive when multiple=true");
      }
      return;
    }
    this.previousSelectedValues = this.matSelect.ngControl.value;
    if (!this.matSelect.ngControl.valueChanges) {
      return;
    }
    this.matSelect.ngControl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe((values) => {
      let restoreSelectedValues = false;
      if (this.matSelect.multiple) {
        if ((this.alwaysRestoreSelectedOptionsMulti || this._formControl.value && this._formControl.value.length) && this.previousSelectedValues && Array.isArray(this.previousSelectedValues)) {
          if (!values || !Array.isArray(values)) {
            values = [];
          }
          const optionValues = this.matSelect.options.map((option) => option.value);
          this.previousSelectedValues.forEach((previousValue) => {
            if (!values.some((v) => this.matSelect.compareWith(v, previousValue)) && !optionValues.some((v) => this.matSelect.compareWith(v, previousValue))) {
              if (this.recreateValuesArray) {
                values = [...values, previousValue];
              } else {
                values.push(previousValue);
              }
              restoreSelectedValues = true;
            }
          });
        }
      }
      this.previousSelectedValues = values;
      if (restoreSelectedValues) {
        this.matSelect._onChange(values);
      }
    });
  }
  /**
   *  Set the width of the innerSelectSearch to fit even custom scrollbars
   *  And support all Operating Systems
   */
  updateInputWidth() {
    if (!this.innerSelectSearch || !this.innerSelectSearch.nativeElement) {
      return;
    }
    let element = this.innerSelectSearch.nativeElement;
    let panelElement = null;
    while (element && element.parentElement) {
      element = element.parentElement;
      if (element.classList.contains("mat-select-panel")) {
        panelElement = element;
        break;
      }
    }
    if (panelElement) {
      this.innerSelectSearch.nativeElement.style.width = panelElement.clientWidth + "px";
    }
  }
  /**
   * Determine the offset to length that can be caused by the optional matOption used as a search input.
   */
  getOptionsLengthOffset() {
    if (this.matOption) {
      return 1;
    } else {
      return 0;
    }
  }
  unselectActiveDescendant() {
    this.activeDescendant?.removeAttribute("aria-selected");
    this.searchSelectInput.nativeElement.removeAttribute("aria-activedescendant");
  }
};
MatSelectSearchComponent.ɵfac = function MatSelectSearchComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MatSelectSearchComponent)(ɵɵdirectiveInject(MatSelect), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ViewportRuler), ɵɵdirectiveInject(MatOption, 8), ɵɵdirectiveInject(MatFormField, 8), ɵɵdirectiveInject(MAT_SELECTSEARCH_DEFAULT_OPTIONS, 8));
};
MatSelectSearchComponent.ɵcmp = ɵɵdefineComponent({
  type: MatSelectSearchComponent,
  selectors: [["ngx-mat-select-search"]],
  contentQueries: function MatSelectSearchComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, MatSelectSearchClearDirective, 5);
      ɵɵcontentQuery(dirIndex, MatSelectNoEntriesFoundDirective, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.clearIcon = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.noEntriesFound = _t.first);
    }
  },
  viewQuery: function MatSelectSearchComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c02, 7, ElementRef);
      ɵɵviewQuery(_c1, 7, ElementRef);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.searchSelectInput = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.innerSelectSearch = _t.first);
    }
  },
  inputs: {
    placeholderLabel: "placeholderLabel",
    type: "type",
    closeIcon: "closeIcon",
    closeSvgIcon: "closeSvgIcon",
    noEntriesFoundLabel: "noEntriesFoundLabel",
    clearSearchInput: "clearSearchInput",
    searching: "searching",
    disableInitialFocus: "disableInitialFocus",
    enableClearOnEscapePressed: "enableClearOnEscapePressed",
    preventHomeEndKeyPropagation: "preventHomeEndKeyPropagation",
    disableScrollToActiveOnOptionsChanged: "disableScrollToActiveOnOptionsChanged",
    ariaLabel: "ariaLabel",
    showToggleAllCheckbox: "showToggleAllCheckbox",
    toggleAllCheckboxChecked: "toggleAllCheckboxChecked",
    toggleAllCheckboxIndeterminate: "toggleAllCheckboxIndeterminate",
    toggleAllCheckboxTooltipMessage: "toggleAllCheckboxTooltipMessage",
    toggleAllCheckboxTooltipPosition: "toggleAllCheckboxTooltipPosition",
    hideClearSearchButton: "hideClearSearchButton",
    alwaysRestoreSelectedOptionsMulti: "alwaysRestoreSelectedOptionsMulti",
    recreateValuesArray: "recreateValuesArray"
  },
  outputs: {
    toggleAll: "toggleAll"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatSelectSearchComponent),
    multi: true
  }])],
  ngContentSelectors: _c3,
  decls: 13,
  vars: 14,
  consts: [["innerSelectSearch", ""], ["searchSelectInput", ""], ["defaultIcon", ""], ["defaultNoEntriesFound", ""], ["matInput", "", 1, "mat-select-search-input", "mat-select-search-hidden"], [1, "mat-select-search-inner", "mat-typography", "mat-datepicker-content", "mat-tab-header", 3, "ngClass"], [1, "mat-select-search-inner-row"], ["class", "mat-select-search-toggle-all-checkbox", "matTooltipClass", "ngx-mat-select-search-toggle-all-tooltip", 3, "color", "checked", "indeterminate", "matTooltip", "matTooltipPosition", "change", 4, "ngIf"], ["autocomplete", "off", 1, "mat-select-search-input", 3, "keydown", "keyup", "blur", "type", "formControl", "placeholder"], ["class", "mat-select-search-spinner", "diameter", "16", 4, "ngIf"], ["mat-icon-button", "", "aria-label", "Clear", "class", "mat-select-search-clear", 3, "click", 4, "ngIf"], ["class", "mat-select-search-no-entries-found", 4, "ngIf"], ["matTooltipClass", "ngx-mat-select-search-toggle-all-tooltip", 1, "mat-select-search-toggle-all-checkbox", 3, "change", "color", "checked", "indeterminate", "matTooltip", "matTooltipPosition"], ["diameter", "16", 1, "mat-select-search-spinner"], ["mat-icon-button", "", "aria-label", "Clear", 1, "mat-select-search-clear", 3, "click"], [4, "ngIf", "ngIfElse"], [3, "svgIcon"], [1, "mat-select-search-no-entries-found"]],
  template: function MatSelectSearchComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵprojectionDef(_c2);
      ɵɵelement(0, "input", 4);
      ɵɵelementStart(1, "div", 5, 0)(3, "div", 6);
      ɵɵtemplate(4, MatSelectSearchComponent_mat_checkbox_4_Template, 1, 5, "mat-checkbox", 7);
      ɵɵelementStart(5, "input", 8, 1);
      ɵɵlistener("keydown", function MatSelectSearchComponent_Template_input_keydown_5_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx._handleKeydown($event));
      })("keyup", function MatSelectSearchComponent_Template_input_keyup_5_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx._handleKeyup($event));
      })("blur", function MatSelectSearchComponent_Template_input_blur_5_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.onBlur());
      });
      ɵɵelementEnd();
      ɵɵtemplate(7, MatSelectSearchComponent_mat_spinner_7_Template, 1, 0, "mat-spinner", 9)(8, MatSelectSearchComponent_button_8_Template, 4, 2, "button", 10);
      ɵɵprojection(9);
      ɵɵelementEnd();
      ɵɵelement(10, "mat-divider");
      ɵɵelementEnd();
      ɵɵtemplate(11, MatSelectSearchComponent_div_11_Template, 4, 2, "div", 11);
      ɵɵpipe(12, "async");
    }
    if (rf & 2) {
      ɵɵadvance();
      ɵɵproperty("ngClass", ɵɵpureFunction2(11, _c4, ctx.matSelect.multiple, ctx._isToggleAllCheckboxVisible()));
      ɵɵadvance(3);
      ɵɵproperty("ngIf", ctx._isToggleAllCheckboxVisible());
      ɵɵadvance();
      ɵɵproperty("type", ctx.type)("formControl", ctx._formControl)("placeholder", ctx.placeholderLabel);
      ɵɵattribute("aria-label", ctx.ariaLabel);
      ɵɵadvance(2);
      ɵɵproperty("ngIf", ctx.searching);
      ɵɵadvance();
      ɵɵproperty("ngIf", !ctx.hideClearSearchButton && ctx.value && !ctx.searching);
      ɵɵadvance(3);
      ɵɵproperty("ngIf", ɵɵpipeBind1(12, 9, ctx._showNoEntriesFound$));
    }
  },
  dependencies: [NgClass, NgIf, DefaultValueAccessor, NgControlStatus, FormControlDirective, MatIconButton, MatCheckbox, MatIcon, MatProgressSpinner, MatTooltip, MatDivider, AsyncPipe],
  styles: [".mat-select-search-hidden[_ngcontent-%COMP%]{visibility:hidden}.mat-select-search-inner[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;z-index:100;font-size:inherit;box-shadow:none;background-color:var(--mat-select-panel-background-color)}.mat-select-search-inner.mat-select-search-inner-multiple.mat-select-search-inner-toggle-all[_ngcontent-%COMP%]   .mat-select-search-inner-row[_ngcontent-%COMP%]{display:flex;align-items:center}.mat-select-search-input[_ngcontent-%COMP%]{box-sizing:border-box;width:100%;border:none;font-family:inherit;font-size:inherit;color:currentColor;outline:none;background-color:var(--mat-select-panel-background-color);padding:0 44px 0 16px;height:calc(3em - 1px);line-height:calc(3em - 1px)}[dir=rtl][_nghost-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%]{padding-right:16px;padding-left:44px}.mat-select-search-input[_ngcontent-%COMP%]::-moz-placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}.mat-select-search-input[_ngcontent-%COMP%]::placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}.mat-select-search-inner-toggle-all[_ngcontent-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%]{padding-left:5px}.mat-select-search-no-entries-found[_ngcontent-%COMP%]{padding-top:8px}.mat-select-search-clear[_ngcontent-%COMP%]{position:absolute;right:4px;top:0}[dir=rtl][_nghost-%COMP%]   .mat-select-search-clear[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-clear[_ngcontent-%COMP%]{right:auto;left:4px}.mat-select-search-spinner[_ngcontent-%COMP%]{position:absolute;right:16px;top:calc(50% - 8px)}[dir=rtl][_nghost-%COMP%]   .mat-select-search-spinner[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-spinner[_ngcontent-%COMP%]{right:auto;left:16px}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search{position:sticky;top:-8px;z-index:1;opacity:1;margin-top:-8px;pointer-events:all}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search .mat-icon{margin-right:0;margin-left:0}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search mat-pseudo-checkbox{display:none}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search .mdc-list-item__primary-text{opacity:1}.mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%]{padding-left:5px}[dir=rtl][_nghost-%COMP%]   .mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%]{padding-left:0;padding-right:5px}"],
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSelectSearchComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-select-search",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MatSelectSearchComponent),
        multi: true
      }],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<!--
Copyright (c) 2018 Bithost GmbH All Rights Reserved.

Use of this source code is governed by an MIT-style license that can be
found in the LICENSE file at https://angular.io/license
-->
<!-- Placeholder to adjust vertical offset of the mat-option elements -->
<input matInput class="mat-select-search-input mat-select-search-hidden"/>

<!-- Note: the  mat-datepicker-content mat-tab-header are needed to inherit the material theme colors, see PR #22 -->
<div
      #innerSelectSearch
      class="mat-select-search-inner mat-typography mat-datepicker-content mat-tab-header"
      [ngClass]="{'mat-select-search-inner-multiple': matSelect.multiple, 'mat-select-search-inner-toggle-all': _isToggleAllCheckboxVisible() }">

  <div class="mat-select-search-inner-row">
    <mat-checkbox *ngIf="_isToggleAllCheckboxVisible()"
                  [color]="matFormField?.color"
                  class="mat-select-search-toggle-all-checkbox"
                  [checked]="toggleAllCheckboxChecked"
                  [indeterminate]="toggleAllCheckboxIndeterminate"
                  [matTooltip]="toggleAllCheckboxTooltipMessage"
                  matTooltipClass="ngx-mat-select-search-toggle-all-tooltip"
                  [matTooltipPosition]="toggleAllCheckboxTooltipPosition"
                  (change)="_emitSelectAllBooleanToParent($event.checked)"
    ></mat-checkbox>

    <input class="mat-select-search-input"
           autocomplete="off"
           [type]="type"
           [formControl]="_formControl"
           #searchSelectInput
           (keydown)="_handleKeydown($event)"
           (keyup)="_handleKeyup($event)"
           (blur)="onBlur()"
           [placeholder]="placeholderLabel"
           [attr.aria-label]="ariaLabel"
    />
    <mat-spinner *ngIf="searching"
            class="mat-select-search-spinner"
            diameter="16"></mat-spinner>

    <button *ngIf="!hideClearSearchButton && value && !searching"
            mat-icon-button
            aria-label="Clear"
            (click)="_reset(true)"
            class="mat-select-search-clear">
      <ng-content *ngIf="clearIcon; else defaultIcon" select="[ngxMatSelectSearchClear]"></ng-content>
      <ng-template #defaultIcon>
        <mat-icon [svgIcon]="closeSvgIcon">
          {{!closeSvgIcon ? closeIcon : null}}
        </mat-icon>
      </ng-template>
    </button>

    <ng-content select=".mat-select-search-custom-header-content"></ng-content>
  </div>

  <mat-divider></mat-divider>
</div>

<div *ngIf="_showNoEntriesFound$ | async"
     class="mat-select-search-no-entries-found">
  <ng-content *ngIf="noEntriesFound; else defaultNoEntriesFound"
              select="[ngxMatSelectNoEntriesFound]"></ng-content>
  <ng-template #defaultNoEntriesFound>{{noEntriesFoundLabel}}</ng-template>
</div>

`,
      styles: [".mat-select-search-hidden{visibility:hidden}.mat-select-search-inner{position:absolute;top:0;left:0;width:100%;z-index:100;font-size:inherit;box-shadow:none;background-color:var(--mat-select-panel-background-color)}.mat-select-search-inner.mat-select-search-inner-multiple.mat-select-search-inner-toggle-all .mat-select-search-inner-row{display:flex;align-items:center}.mat-select-search-input{box-sizing:border-box;width:100%;border:none;font-family:inherit;font-size:inherit;color:currentColor;outline:none;background-color:var(--mat-select-panel-background-color);padding:0 44px 0 16px;height:calc(3em - 1px);line-height:calc(3em - 1px)}:host-context([dir=rtl]) .mat-select-search-input{padding-right:16px;padding-left:44px}.mat-select-search-input::-moz-placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}.mat-select-search-input::placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}.mat-select-search-inner-toggle-all .mat-select-search-input{padding-left:5px}.mat-select-search-no-entries-found{padding-top:8px}.mat-select-search-clear{position:absolute;right:4px;top:0}:host-context([dir=rtl]) .mat-select-search-clear{right:auto;left:4px}.mat-select-search-spinner{position:absolute;right:16px;top:calc(50% - 8px)}:host-context([dir=rtl]) .mat-select-search-spinner{right:auto;left:16px}::ng-deep .mat-mdc-option[aria-disabled=true].contains-mat-select-search{position:sticky;top:-8px;z-index:1;opacity:1;margin-top:-8px;pointer-events:all}::ng-deep .mat-mdc-option[aria-disabled=true].contains-mat-select-search .mat-icon{margin-right:0;margin-left:0}::ng-deep .mat-mdc-option[aria-disabled=true].contains-mat-select-search mat-pseudo-checkbox{display:none}::ng-deep .mat-mdc-option[aria-disabled=true].contains-mat-select-search .mdc-list-item__primary-text{opacity:1}.mat-select-search-toggle-all-checkbox{padding-left:5px}:host-context([dir=rtl]) .mat-select-search-toggle-all-checkbox{padding-left:0;padding-right:5px}\n"]
    }]
  }], function() {
    return [{
      type: MatSelect,
      decorators: [{
        type: Inject,
        args: [MatSelect]
      }]
    }, {
      type: ChangeDetectorRef
    }, {
      type: ViewportRuler
    }, {
      type: MatOption,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [MatOption]
      }]
    }, {
      type: MatFormField,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [MatFormField]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [MAT_SELECTSEARCH_DEFAULT_OPTIONS]
      }]
    }];
  }, {
    placeholderLabel: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    closeIcon: [{
      type: Input
    }],
    closeSvgIcon: [{
      type: Input
    }],
    noEntriesFoundLabel: [{
      type: Input
    }],
    clearSearchInput: [{
      type: Input
    }],
    searching: [{
      type: Input
    }],
    disableInitialFocus: [{
      type: Input
    }],
    enableClearOnEscapePressed: [{
      type: Input
    }],
    preventHomeEndKeyPropagation: [{
      type: Input
    }],
    disableScrollToActiveOnOptionsChanged: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    showToggleAllCheckbox: [{
      type: Input
    }],
    toggleAllCheckboxChecked: [{
      type: Input
    }],
    toggleAllCheckboxIndeterminate: [{
      type: Input
    }],
    toggleAllCheckboxTooltipMessage: [{
      type: Input
    }],
    toggleAllCheckboxTooltipPosition: [{
      type: Input
    }],
    hideClearSearchButton: [{
      type: Input
    }],
    alwaysRestoreSelectedOptionsMulti: [{
      type: Input
    }],
    recreateValuesArray: [{
      type: Input
    }],
    toggleAll: [{
      type: Output
    }],
    searchSelectInput: [{
      type: ViewChild,
      args: ["searchSelectInput", {
        read: ElementRef,
        static: true
      }]
    }],
    innerSelectSearch: [{
      type: ViewChild,
      args: ["innerSelectSearch", {
        read: ElementRef,
        static: true
      }]
    }],
    clearIcon: [{
      type: ContentChild,
      args: [MatSelectSearchClearDirective]
    }],
    noEntriesFound: [{
      type: ContentChild,
      args: [MatSelectNoEntriesFoundDirective]
    }]
  });
})();
var MatSelectSearchVersion = "7.0.9";
var NgxMatSelectSearchModule = class {
};
NgxMatSelectSearchModule.ɵfac = function NgxMatSelectSearchModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMatSelectSearchModule)();
};
NgxMatSelectSearchModule.ɵmod = ɵɵdefineNgModule({
  type: NgxMatSelectSearchModule,
  declarations: [MatSelectSearchComponent, MatSelectSearchClearDirective, MatSelectNoEntriesFoundDirective],
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule, MatDividerModule],
  exports: [MatSelectSearchComponent, MatSelectSearchClearDirective, MatSelectNoEntriesFoundDirective]
});
NgxMatSelectSearchModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule, MatDividerModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatSelectSearchModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule, MatDividerModule],
      declarations: [MatSelectSearchComponent, MatSelectSearchClearDirective, MatSelectNoEntriesFoundDirective],
      exports: [MatSelectSearchComponent, MatSelectSearchClearDirective, MatSelectNoEntriesFoundDirective]
    }]
  }], null, null);
})();
export {
  MAT_SELECTSEARCH_DEFAULT_OPTIONS,
  MatSelectNoEntriesFoundDirective,
  MatSelectSearchClearDirective,
  MatSelectSearchComponent,
  MatSelectSearchVersion,
  NgxMatSelectSearchModule,
  configurableDefaultOptions
};
//# sourceMappingURL=ngx-mat-select-search.js.map
