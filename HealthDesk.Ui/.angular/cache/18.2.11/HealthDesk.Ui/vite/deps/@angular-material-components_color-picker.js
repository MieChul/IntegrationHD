import {
  MatDialog,
  MatDialogModule
} from "./chunk-5TKJS3WK.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-CGG2ESVG.js";
import "./chunk-2EJFHX3U.js";
import {
  MatRadioModule
} from "./chunk-US5MDMFH.js";
import "./chunk-Q62MEOYD.js";
import {
  matDatepickerAnimations
} from "./chunk-FKFCW5UU.js";
import {
  MAT_INPUT_VALUE_ACCESSOR,
  MatInput,
  MatInputModule
} from "./chunk-4TD6ADBP.js";
import {
  MatFormField,
  MatLabel,
  MatPrefix
} from "./chunk-KMV2CMOS.js";
import {
  ComponentPortal,
  Overlay,
  OverlayConfig,
  PortalModule
} from "./chunk-GLKTJXDH.js";
import "./chunk-ZLWDEUY6.js";
import {
  MatButtonModule,
  MatIconButton,
  MatMiniFabButton
} from "./chunk-GLKC3XVZ.js";
import "./chunk-DIOVROW2.js";
import {
  DefaultValueAccessor,
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  MaxValidator,
  MinValidator,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-EYC6H3ZZ.js";
import {
  DOWN_ARROW,
  Directionality,
  ESCAPE,
  MatCommonModule,
  UP_ARROW,
  coerceBooleanProperty,
  mixinColor
} from "./chunk-25W7ATLI.js";
import {
  CommonModule,
  DOCUMENT,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-AJRZKXTD.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  NgZone,
  Optional,
  Output,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation$1,
  forwardRef,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵhostProperty,
  ɵɵinvalidFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵsyntheticHostProperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵviewQuery
} from "./chunk-MQCZQP5K.js";
import {
  merge
} from "./chunk-KT3NRA3D.js";
import "./chunk-5AZMPBFP.js";
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  of,
  take,
  takeUntil
} from "./chunk-FMZF26QI.js";
import "./chunk-ZGWC6NTF.js";

// node_modules/@angular/material/fesm2022/card.mjs
var _c0 = ["*"];
var _c1 = [[["mat-card-title"], ["mat-card-subtitle"], ["", "mat-card-title", ""], ["", "mat-card-subtitle", ""], ["", "matCardTitle", ""], ["", "matCardSubtitle", ""]], [["", "mat-card-image", ""], ["", "matCardImage", ""], ["", "mat-card-sm-image", ""], ["", "matCardImageSmall", ""], ["", "mat-card-md-image", ""], ["", "matCardImageMedium", ""], ["", "mat-card-lg-image", ""], ["", "matCardImageLarge", ""], ["", "mat-card-xl-image", ""], ["", "matCardImageXLarge", ""]], "*"];
var _c2 = ["mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]", "[mat-card-image], [matCardImage],\n                    [mat-card-sm-image], [matCardImageSmall],\n                    [mat-card-md-image], [matCardImageMedium],\n                    [mat-card-lg-image], [matCardImageLarge],\n                    [mat-card-xl-image], [matCardImageXLarge]", "*"];
var _c3 = [[["", "mat-card-avatar", ""], ["", "matCardAvatar", ""]], [["mat-card-title"], ["mat-card-subtitle"], ["", "mat-card-title", ""], ["", "mat-card-subtitle", ""], ["", "matCardTitle", ""], ["", "matCardSubtitle", ""]], "*"];
var _c4 = ["[mat-card-avatar], [matCardAvatar]", "mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]", "*"];
var MAT_CARD_CONFIG = new InjectionToken("MAT_CARD_CONFIG");
var MatCard = class _MatCard {
  constructor(config) {
    this.appearance = config?.appearance || "raised";
  }
  static {
    this.ɵfac = function MatCard_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatCard)(ɵɵdirectiveInject(MAT_CARD_CONFIG, 8));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MatCard,
      selectors: [["mat-card"]],
      hostAttrs: [1, "mat-mdc-card", "mdc-card"],
      hostVars: 4,
      hostBindings: function MatCard_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassProp("mat-mdc-card-outlined", ctx.appearance === "outlined")("mdc-card--outlined", ctx.appearance === "outlined");
        }
      },
      inputs: {
        appearance: "appearance"
      },
      exportAs: ["matCard"],
      standalone: true,
      features: [ɵɵStandaloneFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function MatCard_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ['.mat-mdc-card{display:flex;flex-direction:column;box-sizing:border-box;position:relative;border-style:solid;border-width:0;background-color:var(--mdc-elevated-card-container-color, var(--mat-app-surface-container-low));border-color:var(--mdc-elevated-card-container-color, var(--mat-app-surface-container-low));border-radius:var(--mdc-elevated-card-container-shape, var(--mat-app-corner-medium));box-shadow:var(--mdc-elevated-card-container-elevation, var(--mat-app-level1))}.mat-mdc-card::after{position:absolute;top:0;left:0;width:100%;height:100%;border:solid 1px rgba(0,0,0,0);content:"";display:block;pointer-events:none;box-sizing:border-box;border-radius:var(--mdc-elevated-card-container-shape, var(--mat-app-corner-medium))}.mat-mdc-card-outlined{background-color:var(--mdc-outlined-card-container-color, var(--mat-app-surface));border-radius:var(--mdc-outlined-card-container-shape, var(--mat-app-corner-medium));border-width:var(--mdc-outlined-card-outline-width);border-color:var(--mdc-outlined-card-outline-color, var(--mat-app-outline-variant));box-shadow:var(--mdc-outlined-card-container-elevation, var(--mat-app-level0))}.mat-mdc-card-outlined::after{border:none}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:""}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mat-mdc-card-actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mat-mdc-card-title{font-family:var(--mat-card-title-text-font, var(--mat-app-title-large-font));line-height:var(--mat-card-title-text-line-height, var(--mat-app-title-large-line-height));font-size:var(--mat-card-title-text-size, var(--mat-app-title-large-size));letter-spacing:var(--mat-card-title-text-tracking, var(--mat-app-title-large-tracking));font-weight:var(--mat-card-title-text-weight, var(--mat-app-title-large-weight))}.mat-mdc-card-subtitle{color:var(--mat-card-subtitle-text-color, var(--mat-app-on-surface));font-family:var(--mat-card-subtitle-text-font, var(--mat-app-title-medium-font));line-height:var(--mat-card-subtitle-text-line-height, var(--mat-app-title-medium-line-height));font-size:var(--mat-card-subtitle-text-size, var(--mat-app-title-medium-size));letter-spacing:var(--mat-card-subtitle-text-tracking, var(--mat-app-title-medium-tracking));font-weight:var(--mat-card-subtitle-text-weight, var(--mat-app-title-medium-weight))}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;margin:0}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle{padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;width:100%}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;margin-bottom:16px;object-fit:cover}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title{line-height:normal}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}.mat-mdc-card-actions-align-end{justify-content:flex-end}'],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCard, [{
    type: Component,
    args: [{
      selector: "mat-card",
      host: {
        "class": "mat-mdc-card mdc-card",
        "[class.mat-mdc-card-outlined]": 'appearance === "outlined"',
        "[class.mdc-card--outlined]": 'appearance === "outlined"'
      },
      exportAs: "matCard",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      template: "<ng-content></ng-content>\n",
      styles: ['.mat-mdc-card{display:flex;flex-direction:column;box-sizing:border-box;position:relative;border-style:solid;border-width:0;background-color:var(--mdc-elevated-card-container-color, var(--mat-app-surface-container-low));border-color:var(--mdc-elevated-card-container-color, var(--mat-app-surface-container-low));border-radius:var(--mdc-elevated-card-container-shape, var(--mat-app-corner-medium));box-shadow:var(--mdc-elevated-card-container-elevation, var(--mat-app-level1))}.mat-mdc-card::after{position:absolute;top:0;left:0;width:100%;height:100%;border:solid 1px rgba(0,0,0,0);content:"";display:block;pointer-events:none;box-sizing:border-box;border-radius:var(--mdc-elevated-card-container-shape, var(--mat-app-corner-medium))}.mat-mdc-card-outlined{background-color:var(--mdc-outlined-card-container-color, var(--mat-app-surface));border-radius:var(--mdc-outlined-card-container-shape, var(--mat-app-corner-medium));border-width:var(--mdc-outlined-card-outline-width);border-color:var(--mdc-outlined-card-outline-color, var(--mat-app-outline-variant));box-shadow:var(--mdc-outlined-card-container-elevation, var(--mat-app-level0))}.mat-mdc-card-outlined::after{border:none}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:""}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mat-mdc-card-actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mat-mdc-card-title{font-family:var(--mat-card-title-text-font, var(--mat-app-title-large-font));line-height:var(--mat-card-title-text-line-height, var(--mat-app-title-large-line-height));font-size:var(--mat-card-title-text-size, var(--mat-app-title-large-size));letter-spacing:var(--mat-card-title-text-tracking, var(--mat-app-title-large-tracking));font-weight:var(--mat-card-title-text-weight, var(--mat-app-title-large-weight))}.mat-mdc-card-subtitle{color:var(--mat-card-subtitle-text-color, var(--mat-app-on-surface));font-family:var(--mat-card-subtitle-text-font, var(--mat-app-title-medium-font));line-height:var(--mat-card-subtitle-text-line-height, var(--mat-app-title-medium-line-height));font-size:var(--mat-card-subtitle-text-size, var(--mat-app-title-medium-size));letter-spacing:var(--mat-card-subtitle-text-tracking, var(--mat-app-title-medium-tracking));font-weight:var(--mat-card-subtitle-text-weight, var(--mat-app-title-medium-weight))}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;margin:0}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle{padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;width:100%}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;margin-bottom:16px;object-fit:cover}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title{line-height:normal}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}.mat-mdc-card-actions-align-end{justify-content:flex-end}']
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MAT_CARD_CONFIG]
    }, {
      type: Optional
    }]
  }], {
    appearance: [{
      type: Input
    }]
  });
})();
var MatCardTitle = class _MatCardTitle {
  static {
    this.ɵfac = function MatCardTitle_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatCardTitle)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MatCardTitle,
      selectors: [["mat-card-title"], ["", "mat-card-title", ""], ["", "matCardTitle", ""]],
      hostAttrs: [1, "mat-mdc-card-title"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardTitle, [{
    type: Directive,
    args: [{
      selector: `mat-card-title, [mat-card-title], [matCardTitle]`,
      host: {
        "class": "mat-mdc-card-title"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatCardTitleGroup = class _MatCardTitleGroup {
  static {
    this.ɵfac = function MatCardTitleGroup_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatCardTitleGroup)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MatCardTitleGroup,
      selectors: [["mat-card-title-group"]],
      hostAttrs: [1, "mat-mdc-card-title-group"],
      standalone: true,
      features: [ɵɵStandaloneFeature],
      ngContentSelectors: _c2,
      decls: 4,
      vars: 0,
      template: function MatCardTitleGroup_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef(_c1);
          ɵɵelementStart(0, "div");
          ɵɵprojection(1);
          ɵɵelementEnd();
          ɵɵprojection(2, 1);
          ɵɵprojection(3, 2);
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardTitleGroup, [{
    type: Component,
    args: [{
      selector: "mat-card-title-group",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "class": "mat-mdc-card-title-group"
      },
      standalone: true,
      template: '<div>\n  <ng-content\n      select="mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]"></ng-content>\n</div>\n<ng-content select="[mat-card-image], [matCardImage],\n                    [mat-card-sm-image], [matCardImageSmall],\n                    [mat-card-md-image], [matCardImageMedium],\n                    [mat-card-lg-image], [matCardImageLarge],\n                    [mat-card-xl-image], [matCardImageXLarge]"></ng-content>\n<ng-content></ng-content>\n'
    }]
  }], null, null);
})();
var MatCardContent = class _MatCardContent {
  static {
    this.ɵfac = function MatCardContent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatCardContent)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MatCardContent,
      selectors: [["mat-card-content"]],
      hostAttrs: [1, "mat-mdc-card-content"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardContent, [{
    type: Directive,
    args: [{
      selector: "mat-card-content",
      host: {
        "class": "mat-mdc-card-content"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatCardSubtitle = class _MatCardSubtitle {
  static {
    this.ɵfac = function MatCardSubtitle_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatCardSubtitle)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MatCardSubtitle,
      selectors: [["mat-card-subtitle"], ["", "mat-card-subtitle", ""], ["", "matCardSubtitle", ""]],
      hostAttrs: [1, "mat-mdc-card-subtitle"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardSubtitle, [{
    type: Directive,
    args: [{
      selector: `mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]`,
      host: {
        "class": "mat-mdc-card-subtitle"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatCardActions = class _MatCardActions {
  constructor() {
    this.align = "start";
  }
  static {
    this.ɵfac = function MatCardActions_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatCardActions)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MatCardActions,
      selectors: [["mat-card-actions"]],
      hostAttrs: [1, "mat-mdc-card-actions", "mdc-card__actions"],
      hostVars: 2,
      hostBindings: function MatCardActions_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassProp("mat-mdc-card-actions-align-end", ctx.align === "end");
        }
      },
      inputs: {
        align: "align"
      },
      exportAs: ["matCardActions"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardActions, [{
    type: Directive,
    args: [{
      selector: "mat-card-actions",
      exportAs: "matCardActions",
      host: {
        "class": "mat-mdc-card-actions mdc-card__actions",
        "[class.mat-mdc-card-actions-align-end]": 'align === "end"'
      },
      standalone: true
    }]
  }], null, {
    align: [{
      type: Input
    }]
  });
})();
var MatCardHeader = class _MatCardHeader {
  static {
    this.ɵfac = function MatCardHeader_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatCardHeader)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MatCardHeader,
      selectors: [["mat-card-header"]],
      hostAttrs: [1, "mat-mdc-card-header"],
      standalone: true,
      features: [ɵɵStandaloneFeature],
      ngContentSelectors: _c4,
      decls: 4,
      vars: 0,
      consts: [[1, "mat-mdc-card-header-text"]],
      template: function MatCardHeader_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef(_c3);
          ɵɵprojection(0);
          ɵɵelementStart(1, "div", 0);
          ɵɵprojection(2, 1);
          ɵɵelementEnd();
          ɵɵprojection(3, 2);
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardHeader, [{
    type: Component,
    args: [{
      selector: "mat-card-header",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "class": "mat-mdc-card-header"
      },
      standalone: true,
      template: '<ng-content select="[mat-card-avatar], [matCardAvatar]"></ng-content>\n<div class="mat-mdc-card-header-text">\n  <ng-content\n      select="mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]"></ng-content>\n</div>\n<ng-content></ng-content>\n'
    }]
  }], null, null);
})();
var MatCardFooter = class _MatCardFooter {
  static {
    this.ɵfac = function MatCardFooter_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatCardFooter)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MatCardFooter,
      selectors: [["mat-card-footer"]],
      hostAttrs: [1, "mat-mdc-card-footer"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardFooter, [{
    type: Directive,
    args: [{
      selector: "mat-card-footer",
      host: {
        "class": "mat-mdc-card-footer"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatCardImage = class _MatCardImage {
  static {
    this.ɵfac = function MatCardImage_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatCardImage)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MatCardImage,
      selectors: [["", "mat-card-image", ""], ["", "matCardImage", ""]],
      hostAttrs: [1, "mat-mdc-card-image", "mdc-card__media"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-image], [matCardImage]",
      host: {
        "class": "mat-mdc-card-image mdc-card__media"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatCardSmImage = class _MatCardSmImage {
  static {
    this.ɵfac = function MatCardSmImage_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatCardSmImage)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MatCardSmImage,
      selectors: [["", "mat-card-sm-image", ""], ["", "matCardImageSmall", ""]],
      hostAttrs: [1, "mat-mdc-card-sm-image", "mdc-card__media"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardSmImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-sm-image], [matCardImageSmall]",
      host: {
        "class": "mat-mdc-card-sm-image mdc-card__media"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatCardMdImage = class _MatCardMdImage {
  static {
    this.ɵfac = function MatCardMdImage_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatCardMdImage)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MatCardMdImage,
      selectors: [["", "mat-card-md-image", ""], ["", "matCardImageMedium", ""]],
      hostAttrs: [1, "mat-mdc-card-md-image", "mdc-card__media"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardMdImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-md-image], [matCardImageMedium]",
      host: {
        "class": "mat-mdc-card-md-image mdc-card__media"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatCardLgImage = class _MatCardLgImage {
  static {
    this.ɵfac = function MatCardLgImage_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatCardLgImage)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MatCardLgImage,
      selectors: [["", "mat-card-lg-image", ""], ["", "matCardImageLarge", ""]],
      hostAttrs: [1, "mat-mdc-card-lg-image", "mdc-card__media"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardLgImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-lg-image], [matCardImageLarge]",
      host: {
        "class": "mat-mdc-card-lg-image mdc-card__media"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatCardXlImage = class _MatCardXlImage {
  static {
    this.ɵfac = function MatCardXlImage_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatCardXlImage)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MatCardXlImage,
      selectors: [["", "mat-card-xl-image", ""], ["", "matCardImageXLarge", ""]],
      hostAttrs: [1, "mat-mdc-card-xl-image", "mdc-card__media"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardXlImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-xl-image], [matCardImageXLarge]",
      host: {
        "class": "mat-mdc-card-xl-image mdc-card__media"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatCardAvatar = class _MatCardAvatar {
  static {
    this.ɵfac = function MatCardAvatar_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatCardAvatar)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MatCardAvatar,
      selectors: [["", "mat-card-avatar", ""], ["", "matCardAvatar", ""]],
      hostAttrs: [1, "mat-mdc-card-avatar"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardAvatar, [{
    type: Directive,
    args: [{
      selector: "[mat-card-avatar], [matCardAvatar]",
      host: {
        "class": "mat-mdc-card-avatar"
      },
      standalone: true
    }]
  }], null, null);
})();
var CARD_DIRECTIVES = [MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardLgImage, MatCardMdImage, MatCardSmImage, MatCardSubtitle, MatCardTitle, MatCardTitleGroup, MatCardXlImage];
var MatCardModule = class _MatCardModule {
  static {
    this.ɵfac = function MatCardModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatCardModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _MatCardModule,
      imports: [MatCommonModule, CommonModule, MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardLgImage, MatCardMdImage, MatCardSmImage, MatCardSubtitle, MatCardTitle, MatCardTitleGroup, MatCardXlImage],
      exports: [MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardLgImage, MatCardMdImage, MatCardSmImage, MatCardSubtitle, MatCardTitle, MatCardTitleGroup, MatCardXlImage, MatCommonModule]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [MatCommonModule, CommonModule, MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, CommonModule, ...CARD_DIRECTIVES],
      exports: [CARD_DIRECTIVES, MatCommonModule]
    }]
  }], null, null);
})();

// node_modules/@angular-material-components/color-picker/fesm2020/angular-material-components-color-picker.mjs
var _c02 = (a0) => ({
  "active": a0
});
function NgxMatColorCollectionComponent_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 2);
    ɵɵlistener("click", function NgxMatColorCollectionComponent_button_1_Template_button_click_0_listener() {
      const c_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.select(c_r2));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const c_r2 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵstyleProp("background-color", c_r2);
    ɵɵproperty("ngClass", ɵɵpureFunction1(4, _c02, ctx_r2.selectedColor === c_r2))("disableRipple", true);
  }
}
function NgxMatColorCollectionComponent_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 2);
    ɵɵlistener("click", function NgxMatColorCollectionComponent_button_3_Template_button_click_0_listener() {
      const c_r5 = ɵɵrestoreView(_r4).$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.select(c_r5));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵstyleProp("background-color", c_r5);
    ɵɵproperty("ngClass", ɵɵpureFunction1(4, _c02, ctx_r2.selectedColor === c_r5))("disableRipple", true);
  }
}
var _c12 = ["button"];
var _c22 = [[["", "ngxMatColorpickerToggleIcon", ""]]];
var _c32 = ["[ngxMatColorpickerToggleIcon]"];
function NgxMatColorToggleComponent_mat_icon_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-icon");
    ɵɵtext(1, " palette ");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleProp("color", ctx_r1.picker == null ? null : ctx_r1.picker._selected == null ? null : ctx_r1.picker._selected.rgba);
  }
}
var trimLeft = /^\s+/;
var trimRight = /\s+$/;
var mathRound = Math.round;
var NUMERIC_REGEX = /[^0-9]/g;
var MAX_RGB = 255;
var MIN_RGB = 0;
var BASIC_COLORS = ["#ffffff", "#ffff00", "#ff00ff", "#ff0000", "#c0c0c0", "#808080", "#808000", "#800080", "#800000", "#00ffff", "#00ff00", "#008080", "#008000", "#0000ff", "#000080", "#000000"];
function getColorAtPosition(ctx, x, y) {
  const imageData = ctx.getImageData(x, y, 1, 1).data;
  return {
    r: imageData[0],
    g: imageData[1],
    b: imageData[2]
  };
}
function rgbaToHex(r, g, b, a, allow4Char) {
  var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16)), pad2(convertDecimalToHex(a))];
  if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join("");
}
function pad2(c) {
  return c.length == 1 ? "0" + c : "" + c;
}
function convertDecimalToHex(d) {
  return Math.round(parseFloat(d) * 255).toString(16);
}
function convertHexToDecimal(h) {
  return parseIntFromHex(h) / 255;
}
function parseIntFromHex(val) {
  return parseInt(val, 16);
}
function rgbToHex(r, g, b, allow3Char) {
  var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];
  if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
}
var CSS_INTEGER = "[-\\+]?\\d+%?";
var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
  rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
  hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
  hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
  hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
  hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function stringInputToObject(color) {
  color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
  let match;
  let obj;
  if (match = matchers.rgb.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3],
      a: 1
    };
  }
  if (match = matchers.rgba.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hex8.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4])
    };
  }
  if (match = matchers.hex6.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: 1
    };
  }
  if (match = matchers.hex4.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      a: convertHexToDecimal(match[4] + "" + match[4])
    };
  }
  if (match = matchers.hex3.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      a: 1
    };
  }
  return null;
}
function createMissingDateImplError(provider) {
  return Error(`NgxMatColorPicker: No provider found for ${provider}. You must define MAT_COLOR_FORMATS in your module`);
}
var Color = class {
  constructor(_r, _g, _b, _a) {
    this.r = _r > MAX_RGB ? MAX_RGB : _r;
    this.g = _g > MAX_RGB ? MAX_RGB : _g;
    this.b = _b > MAX_RGB ? MAX_RGB : _b;
    if (_a != null) {
      this.a = _a > 1 ? 1 : _a;
    } else {
      this.a = 1;
    }
    this.roundA = Math.round(this.a);
    this.hex = rgbToHex(this.r, this.g, this.b);
    this.rgba = this.toRgba();
  }
  toHex(allow3Char) {
    return rgbToHex(this.r, this.g, this.b, allow3Char);
  }
  toRgba() {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }
  toHexString(allow3Char) {
    return "#" + this.toHex(allow3Char);
  }
  toRgbString() {
    return this.a === 1 ? "rgb(" + Math.round(this.r) + ", " + Math.round(this.g) + ", " + Math.round(this.b) + ")" : "rgba(" + Math.round(this.r) + ", " + Math.round(this.g) + ", " + Math.round(this.b) + ", " + this.roundA + ")";
  }
  toHex8(allow4Char) {
    return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
  }
  toHex8String(allow4Char) {
    return "#" + this.toHex8(allow4Char);
  }
  toString(format) {
    let formatSet = !!format;
    let formattedString;
    let hasAlpha = this.a < 1 && this.a >= 0;
    let needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8");
    if (needsAlphaFormat) {
      return this.toRgbString();
    }
    if (format === "rgb") {
      formattedString = this.toRgbString();
    }
    if (format === "hex" || format === "hex6") {
      formattedString = this.toHexString();
    }
    if (format === "hex3") {
      formattedString = this.toHexString(true);
    }
    if (format === "hex4") {
      formattedString = this.toHex8String(true);
    }
    if (format === "hex8") {
      formattedString = this.toHex8String();
    }
    return formattedString || this.toHexString();
  }
};
var NgxMatBaseColorCanvas = class {
  constructor(zone, elementId) {
    this.zone = zone;
    this.colorChanged = new EventEmitter();
    this.x = 0;
    this.y = 0;
    this.drag = false;
    this._destroyed = new Subject();
    this.elementId = elementId;
  }
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
  ngAfterViewInit() {
    this.canvas = document.getElementById(this.elementId);
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.draw();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.rect(0, 0, this.width, this.height);
    this.fillGradient();
    if (this.y != 0) {
      this.redrawIndicator(this.x, this.y);
    }
  }
  onMousedown(e) {
    this.drag = true;
    this.changeColor(e);
    this.zone.runOutsideAngular(() => {
      this.canvas.addEventListener("mousemove", this.onMousemove.bind(this));
    });
  }
  onMousemove(e) {
    if (this.drag) {
      this.zone.run(() => {
        this.changeColor(e);
      });
    }
  }
  onMouseup(e) {
    this.drag = false;
    this.canvas.removeEventListener("mousemove", this.onMousemove);
  }
  emitChange(color) {
    this.colorChanged.emit(color);
  }
};
NgxMatBaseColorCanvas.ɵfac = function NgxMatBaseColorCanvas_Factory(__ngFactoryType__) {
  ɵɵinvalidFactory();
};
NgxMatBaseColorCanvas.ɵdir = ɵɵdefineDirective({
  type: NgxMatBaseColorCanvas,
  inputs: {
    color: "color",
    theme: "theme"
  },
  outputs: {
    colorChanged: "colorChanged"
  }
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatBaseColorCanvas, [{
    type: Directive,
    args: [{}]
  }], function() {
    return [{
      type: NgZone
    }, {
      type: void 0
    }];
  }, {
    colorChanged: [{
      type: Output
    }],
    color: [{
      type: Input
    }],
    theme: [{
      type: Input
    }]
  });
})();
var NgxMatColorSliderComponent = class extends NgxMatBaseColorCanvas {
  constructor(zone) {
    super(zone, "color-strip");
    this.zone = zone;
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
  fillGradient() {
    const grd = this.ctx.createLinearGradient(0, 0, 0, this.height);
    grd.addColorStop(0, "rgba(255, 0, 0, 1)");
    grd.addColorStop(0.17, "rgba(255, 255, 0, 1)");
    grd.addColorStop(0.34, "rgba(0, 255, 0, 1)");
    grd.addColorStop(0.51, "rgba(0, 255, 255, 1)");
    grd.addColorStop(0.68, "rgba(0, 0, 255, 1)");
    grd.addColorStop(0.85, "rgba(255, 0, 255, 1)");
    grd.addColorStop(1, "rgba(255, 0, 0, 1)");
    this.ctx.fillStyle = grd;
    this.ctx.fill();
  }
  redrawIndicator(x, y) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 2;
    this.ctx.arc(7.5, y, 7.5, 0, 2 * Math.PI, false);
    this.ctx.stroke();
    this.ctx.closePath();
  }
  changeColor(e) {
    this.x = e.offsetX;
    this.y = e.offsetY;
    this.draw();
    const {
      r,
      g,
      b
    } = getColorAtPosition(this.ctx, e.offsetX, e.offsetY);
    this.emitChange(new Color(r, g, b));
  }
};
NgxMatColorSliderComponent.ɵfac = function NgxMatColorSliderComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMatColorSliderComponent)(ɵɵdirectiveInject(NgZone));
};
NgxMatColorSliderComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMatColorSliderComponent,
  selectors: [["ngx-mat-color-slider"]],
  features: [ɵɵInheritDefinitionFeature],
  decls: 1,
  vars: 0,
  consts: [["id", "color-strip", "width", "15", "height", "234", 1, "zone-strip", 3, "mousedown", "mouseup"]],
  template: function NgxMatColorSliderComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "canvas", 0);
      ɵɵlistener("mousedown", function NgxMatColorSliderComponent_Template_canvas_mousedown_0_listener($event) {
        return ctx.onMousedown($event);
      })("mouseup", function NgxMatColorSliderComponent_Template_canvas_mouseup_0_listener($event) {
        return ctx.onMouseup($event);
      });
      ɵɵelementEnd();
    }
  }
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatColorSliderComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-color-slider",
      template: '<canvas id="color-strip" class="zone-strip" (mousedown)="onMousedown($event)" (mouseup)="onMouseup($event)"\r\n width="15" height="234"></canvas>'
    }]
  }], function() {
    return [{
      type: NgZone
    }];
  }, null);
})();
var NumericColorInputDirective = class {
  constructor() {
  }
  onInput($event) {
    this._formatInput($event.target);
  }
  /**
  * Format input
  * @param input
  */
  _formatInput(input) {
    let val = Number(input.value.replace(NUMERIC_REGEX, ""));
    val = isNaN(val) ? 0 : val;
    input.value = val;
  }
};
NumericColorInputDirective.ɵfac = function NumericColorInputDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NumericColorInputDirective)();
};
NumericColorInputDirective.ɵdir = ɵɵdefineDirective({
  type: NumericColorInputDirective,
  selectors: [["", "ngxMatNumericColorInput", ""]],
  hostBindings: function NumericColorInputDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("input", function NumericColorInputDirective_input_HostBindingHandler($event) {
        return ctx.onInput($event);
      });
    }
  }
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NumericColorInputDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxMatNumericColorInput]"
    }]
  }], function() {
    return [];
  }, {
    onInput: [{
      type: HostListener,
      args: ["input", ["$event"]]
    }]
  });
})();
var RADIUS_NOB = 5;
var NgxMatColorCanvasComponent = class extends NgxMatBaseColorCanvas {
  constructor(zone) {
    super(zone, "color-block");
    this.zone = zone;
    this._resetBaseColor = true;
    this.formGroup = new FormGroup({
      r: new FormControl(null, [Validators.required]),
      g: new FormControl(null, [Validators.required]),
      b: new FormControl(null, [Validators.required]),
      a: new FormControl(null, [Validators.required]),
      hex: new FormControl(null, [Validators.required, Validators.pattern(matchers.hex6)])
    });
  }
  get rCtrl() {
    return this.formGroup.get("r");
  }
  get gCtrl() {
    return this.formGroup.get("g");
  }
  get bCtrl() {
    return this.formGroup.get("b");
  }
  get aCtrl() {
    return this.formGroup.get("a");
  }
  get hexCtrl() {
    return this.formGroup.get("hex");
  }
  ngOnInit() {
    const rgbaCtrl$ = merge(this.rCtrl.valueChanges, this.gCtrl.valueChanges, this.bCtrl.valueChanges, this.aCtrl.valueChanges);
    rgbaCtrl$.pipe(takeUntil(this._destroyed), debounceTime(400)).subscribe((_) => {
      const color = new Color(Number(this.rCtrl.value), Number(this.gCtrl.value), Number(this.bCtrl.value), Number(this.aCtrl.value));
      this.emitChange(color);
    });
    const hexCtrl$ = this.hexCtrl.valueChanges;
    hexCtrl$.pipe(takeUntil(this._destroyed), debounceTime(400), distinctUntilChanged()).subscribe((hex) => {
      const obj = stringInputToObject(hex);
      if (obj != null) {
        const color = new Color(obj.r, obj.g, obj.b, obj.a);
        this.emitChange(color);
      }
    });
  }
  ngOnChanges(changes) {
    if (changes.color && changes.color.currentValue) {
      this.updateForm(changes.color.currentValue);
      if (this._resetBaseColor) {
        this._baseColor = changes.color.currentValue;
      }
      this._resetBaseColor = true;
      if (!changes.color.firstChange) {
        this.draw();
      }
    }
  }
  updateForm(val) {
    const config = {
      emitEvent: false
    };
    this.rCtrl.setValue(val.r, config);
    this.gCtrl.setValue(val.g, config);
    this.bCtrl.setValue(val.b, config);
    this.aCtrl.setValue(val.a, config);
    this.hexCtrl.setValue(val.hex, config);
  }
  redrawIndicator(x, y) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "white";
    this.ctx.arc(x, y, RADIUS_NOB, 0, 2 * Math.PI, false);
    this.ctx.stroke();
    this.ctx.closePath();
  }
  fillGradient() {
    this.ctx.fillStyle = this._baseColor ? this._baseColor.rgba : "rgba(255,255,255,1)";
    this.ctx.fillRect(0, 0, this.width, this.height);
    const grdWhite = this.ctx.createLinearGradient(0, 0, this.width, 0);
    grdWhite.addColorStop(0, "rgba(255,255,255,1)");
    grdWhite.addColorStop(1, "rgba(255,255,255,0)");
    this.ctx.fillStyle = grdWhite;
    this.ctx.fillRect(0, 0, this.width, this.height);
    const grdBlack = this.ctx.createLinearGradient(0, 0, 0, this.height);
    grdBlack.addColorStop(0, "rgba(0,0,0,0)");
    grdBlack.addColorStop(1, "rgba(0,0,0,1)");
    this.ctx.fillStyle = grdBlack;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
  onSliderColorChanged(c) {
    this._baseColor = c;
    this.color = c;
    this.fillGradient();
    this.emitChange(c);
  }
  changeColor(e) {
    this.x = e.offsetX;
    this.y = e.offsetY;
    this._resetBaseColor = false;
    this.draw();
    const {
      r,
      g,
      b
    } = getColorAtPosition(this.ctx, e.offsetX, e.offsetY);
    this.emitChange(new Color(r, g, b));
  }
};
NgxMatColorCanvasComponent.ɵfac = function NgxMatColorCanvasComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMatColorCanvasComponent)(ɵɵdirectiveInject(NgZone));
};
NgxMatColorCanvasComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMatColorCanvasComponent,
  selectors: [["ngx-mat-color-canvas"]],
  hostAttrs: [1, "ngx-mat-color-canvas"],
  features: [ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature],
  decls: 30,
  vars: 8,
  consts: [[3, "formGroup"], [1, "color-canvas-row"], [1, "zone-canvas"], ["id", "color-block", "width", "200", "height", "235", 1, "zone-block", 3, "mousedown", "mouseup"], [3, "colorChanged"], [1, "zone-inputs"], [3, "color"], ["matInput", "", "formControlName", "r", "ngxMatNumericColorInput", "", "autocomplete", "off"], ["matInput", "", "formControlName", "g", "ngxMatNumericColorInput", "", "autocomplete", "off"], ["matInput", "", "formControlName", "b", "ngxMatNumericColorInput", "", "autocomplete", "off"], ["mat-mini-fab", "", 1, "preview"], ["matPrefix", "", 1, "symbol"], ["matInput", "", "formControlName", "hex", "autocomplete", "off"], [1, "input-opacity", 3, "color"], ["matInput", "", "formControlName", "a", "type", "number", "min", "0", "max", "1", "step", "0.1", "autocomplete", "off"]],
  template: function NgxMatColorCanvasComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "form", 0)(1, "div", 1)(2, "div", 2)(3, "canvas", 3);
      ɵɵlistener("mousedown", function NgxMatColorCanvasComponent_Template_canvas_mousedown_3_listener($event) {
        return ctx.onMousedown($event);
      })("mouseup", function NgxMatColorCanvasComponent_Template_canvas_mouseup_3_listener($event) {
        return ctx.onMouseup($event);
      });
      ɵɵelementEnd();
      ɵɵelementStart(4, "ngx-mat-color-slider", 4);
      ɵɵlistener("colorChanged", function NgxMatColorCanvasComponent_Template_ngx_mat_color_slider_colorChanged_4_listener($event) {
        return ctx.onSliderColorChanged($event);
      });
      ɵɵelementEnd()();
      ɵɵelementStart(5, "div", 5)(6, "mat-form-field", 6)(7, "mat-label");
      ɵɵtext(8, "R");
      ɵɵelementEnd();
      ɵɵelement(9, "input", 7);
      ɵɵelementEnd();
      ɵɵelementStart(10, "mat-form-field", 6)(11, "mat-label");
      ɵɵtext(12, "G");
      ɵɵelementEnd();
      ɵɵelement(13, "input", 8);
      ɵɵelementEnd();
      ɵɵelementStart(14, "mat-form-field", 6)(15, "mat-label");
      ɵɵtext(16, "B");
      ɵɵelementEnd();
      ɵɵelement(17, "input", 9);
      ɵɵelementEnd()()();
      ɵɵelementStart(18, "div", 1);
      ɵɵelement(19, "button", 10);
      ɵɵelementStart(20, "mat-form-field", 6)(21, "mat-label");
      ɵɵtext(22, "HEX6");
      ɵɵelementEnd();
      ɵɵelementStart(23, "mat-label", 11);
      ɵɵtext(24, "# ");
      ɵɵelementEnd();
      ɵɵelement(25, "input", 12);
      ɵɵelementEnd();
      ɵɵelementStart(26, "mat-form-field", 13)(27, "mat-label");
      ɵɵtext(28, "A");
      ɵɵelementEnd();
      ɵɵelement(29, "input", 14);
      ɵɵelementEnd()()();
    }
    if (rf & 2) {
      ɵɵproperty("formGroup", ctx.formGroup);
      ɵɵadvance(6);
      ɵɵproperty("color", ctx.theme);
      ɵɵadvance(4);
      ɵɵproperty("color", ctx.theme);
      ɵɵadvance(4);
      ɵɵproperty("color", ctx.theme);
      ɵɵadvance(5);
      ɵɵstyleProp("background-color", (ctx.color == null ? null : ctx.color.rgba) || "transparent");
      ɵɵadvance();
      ɵɵproperty("color", ctx.theme);
      ɵɵadvance(6);
      ɵɵproperty("color", ctx.theme);
    }
  },
  dependencies: [MatInput, MatFormField, MatLabel, MatPrefix, MatMiniFabButton, ɵNgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, FormGroupDirective, FormControlName, NgxMatColorSliderComponent, NumericColorInputDirective],
  styles: [".ngx-mat-color-canvas .color-canvas-row{display:flex}.ngx-mat-color-canvas .color-canvas-row:first-of-type{height:235px;margin-bottom:12px}.ngx-mat-color-canvas .color-canvas-row:first-of-type .card{height:180px}.ngx-mat-color-canvas .color-canvas-row canvas:hover{cursor:crosshair}.ngx-mat-color-canvas .color-canvas-row .zone{display:flex}.ngx-mat-color-canvas .color-canvas-row .zone-canvas{height:235px}.ngx-mat-color-canvas .color-canvas-row .zone-canvas .zone-block{border:1px solid rgba(0,0,0,.12)}.ngx-mat-color-canvas .color-canvas-row .zone-strip{flex-basis:auto;margin-left:10px}.ngx-mat-color-canvas .color-canvas-row .zone-inputs{display:flex;width:60px;height:235px;flex-direction:column;margin-left:16px;margin-top:12px}.ngx-mat-color-canvas .color-canvas-row:nth-of-type(2){display:flex}.ngx-mat-color-canvas .color-canvas-row:nth-of-type(2) .preview{min-width:40px;min-height:40px;height:40px;width:40px;margin-top:12px}.ngx-mat-color-canvas .color-canvas-row:nth-of-type(2) .mat-mdc-form-field{margin-left:16px}.ngx-mat-color-canvas .color-canvas-row:nth-of-type(2) .mat-mdc-form-field:first-of-type{width:170px}.ngx-mat-color-canvas .color-canvas-row:nth-of-type(2) .mat-mdc-form-field:first-of-type .symbol{font-weight:700;color:#0000008a}.ngx-mat-color-canvas .color-canvas-row:nth-of-type(2) .mat-mdc-form-field:last-of-type{width:60px}.ngx-mat-color-canvas .color-canvas-row:nth-of-type(2) .mat-mdc-form-field:last-of-type .mat-mdc-text-field-wrapper{padding:0 8px}.ngx-mat-color-canvas .mat-mdc-form-field-label{font-weight:700}.ngx-mat-color-canvas .mat-mdc-form-field .mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:transparent}\n"],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatColorCanvasComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-color-canvas",
      encapsulation: ViewEncapsulation$1.None,
      host: {
        "class": "ngx-mat-color-canvas"
      },
      template: `<form [formGroup]="formGroup">\r
    <div class="color-canvas-row">\r
        <div class="zone-canvas">\r
            <canvas id="color-block" class="zone-block" (mousedown)="onMousedown($event)" (mouseup)="onMouseup($event)"\r
                width="200" height="235"></canvas>\r
            <ngx-mat-color-slider (colorChanged)="onSliderColorChanged($event)"></ngx-mat-color-slider>\r
        </div>\r
\r
        <div class="zone-inputs">\r
            <mat-form-field [color]="theme">\r
                <mat-label>R</mat-label>\r
                <input matInput formControlName="r" ngxMatNumericColorInput autocomplete="off">\r
            </mat-form-field>\r
\r
            <mat-form-field [color]="theme">\r
                <mat-label>G</mat-label>\r
                <input matInput formControlName="g" ngxMatNumericColorInput autocomplete="off">\r
            </mat-form-field>\r
\r
            <mat-form-field [color]="theme">\r
                <mat-label>B</mat-label>\r
                <input matInput formControlName="b" ngxMatNumericColorInput autocomplete="off">\r
            </mat-form-field>\r
        </div>\r
    </div>\r
\r
    <div class="color-canvas-row">\r
        <button mat-mini-fab [style.background-color]="color?.rgba || 'transparent'" class="preview"></button>\r
        <mat-form-field [color]="theme">\r
            <mat-label>HEX6</mat-label>\r
            <mat-label matPrefix class="symbol">#&nbsp;</mat-label>\r
            <input matInput formControlName="hex" autocomplete="off">\r
        </mat-form-field>\r
        <mat-form-field class="input-opacity" [color]="theme">\r
            <mat-label>A</mat-label>\r
            <input matInput formControlName="a" type="number" min="0" max="1" step="0.1" autocomplete="off">\r
        </mat-form-field>\r
    </div>\r
</form>`,
      styles: [".ngx-mat-color-canvas .color-canvas-row{display:flex}.ngx-mat-color-canvas .color-canvas-row:first-of-type{height:235px;margin-bottom:12px}.ngx-mat-color-canvas .color-canvas-row:first-of-type .card{height:180px}.ngx-mat-color-canvas .color-canvas-row canvas:hover{cursor:crosshair}.ngx-mat-color-canvas .color-canvas-row .zone{display:flex}.ngx-mat-color-canvas .color-canvas-row .zone-canvas{height:235px}.ngx-mat-color-canvas .color-canvas-row .zone-canvas .zone-block{border:1px solid rgba(0,0,0,.12)}.ngx-mat-color-canvas .color-canvas-row .zone-strip{flex-basis:auto;margin-left:10px}.ngx-mat-color-canvas .color-canvas-row .zone-inputs{display:flex;width:60px;height:235px;flex-direction:column;margin-left:16px;margin-top:12px}.ngx-mat-color-canvas .color-canvas-row:nth-of-type(2){display:flex}.ngx-mat-color-canvas .color-canvas-row:nth-of-type(2) .preview{min-width:40px;min-height:40px;height:40px;width:40px;margin-top:12px}.ngx-mat-color-canvas .color-canvas-row:nth-of-type(2) .mat-mdc-form-field{margin-left:16px}.ngx-mat-color-canvas .color-canvas-row:nth-of-type(2) .mat-mdc-form-field:first-of-type{width:170px}.ngx-mat-color-canvas .color-canvas-row:nth-of-type(2) .mat-mdc-form-field:first-of-type .symbol{font-weight:700;color:#0000008a}.ngx-mat-color-canvas .color-canvas-row:nth-of-type(2) .mat-mdc-form-field:last-of-type{width:60px}.ngx-mat-color-canvas .color-canvas-row:nth-of-type(2) .mat-mdc-form-field:last-of-type .mat-mdc-text-field-wrapper{padding:0 8px}.ngx-mat-color-canvas .mat-mdc-form-field-label{font-weight:700}.ngx-mat-color-canvas .mat-mdc-form-field .mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:transparent}\n"]
    }]
  }], function() {
    return [{
      type: NgZone
    }];
  }, null);
})();
var NgxMatColorCollectionComponent = class {
  constructor() {
    this.colorChanged = new EventEmitter();
    this.colors1 = BASIC_COLORS.slice(0, 8);
    this.colors2 = BASIC_COLORS.slice(8, 16);
  }
  set color(c) {
    if (c) {
      this.selectedColor = c.toHexString();
    }
  }
  ngOnInit() {
  }
  select(hex) {
    this.selectedColor = hex;
    const {
      r,
      g,
      b,
      a
    } = stringInputToObject(hex);
    this.colorChanged.emit(new Color(r, g, b, a));
  }
};
NgxMatColorCollectionComponent.ɵfac = function NgxMatColorCollectionComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMatColorCollectionComponent)();
};
NgxMatColorCollectionComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMatColorCollectionComponent,
  selectors: [["ngx-mat-color-collection"]],
  hostAttrs: [1, "ngx-mat-color-collection"],
  inputs: {
    color: "color"
  },
  outputs: {
    colorChanged: "colorChanged"
  },
  decls: 4,
  vars: 2,
  consts: [[1, "color-collection-row"], ["mat-mini-fab", "", "class", "btn-color", 3, "background-color", "ngClass", "disableRipple", "click", 4, "ngFor", "ngForOf"], ["mat-mini-fab", "", 1, "btn-color", 3, "click", "ngClass", "disableRipple"]],
  template: function NgxMatColorCollectionComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 0);
      ɵɵtemplate(1, NgxMatColorCollectionComponent_button_1_Template, 1, 6, "button", 1);
      ɵɵelementEnd();
      ɵɵelementStart(2, "div", 0);
      ɵɵtemplate(3, NgxMatColorCollectionComponent_button_3_Template, 1, 6, "button", 1);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵadvance();
      ɵɵproperty("ngForOf", ctx.colors1);
      ɵɵadvance(2);
      ɵɵproperty("ngForOf", ctx.colors2);
    }
  },
  dependencies: [NgClass, NgForOf, MatMiniFabButton],
  styles: [".ngx-mat-color-collection .btn-color{height:20px;width:20px;margin-right:11px;box-shadow:none;opacity:.3;will-change:opacity;transition:opacity .3s linear}.ngx-mat-color-collection .btn-color.active{box-shadow:0 3px 5px -1px #0003,0 6px 10px #00000024,0 1px 18px #0000001f;opacity:1}.ngx-mat-color-collection .btn-color .mat-mdc-button-touch-target{display:none!important}\n"],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatColorCollectionComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-color-collection",
      encapsulation: ViewEncapsulation$1.None,
      host: {
        "class": "ngx-mat-color-collection"
      },
      template: `<div class="color-collection-row">\r
  <button *ngFor="let c of colors1" mat-mini-fab [style.background-color]="c" class="btn-color"\r
    (click)="select(c)" [ngClass]="{'active': selectedColor === c}" [disableRipple]="true">\r
  </button>\r
</div>\r
<div class="color-collection-row">\r
  <button *ngFor="let c of colors2" mat-mini-fab [style.background-color]="c" class="btn-color"\r
    (click)="select(c)" [ngClass]="{'active': selectedColor === c}" [disableRipple]="true">\r
  </button>\r
</div>`,
      styles: [".ngx-mat-color-collection .btn-color{height:20px;width:20px;margin-right:11px;box-shadow:none;opacity:.3;will-change:opacity;transition:opacity .3s linear}.ngx-mat-color-collection .btn-color.active{box-shadow:0 3px 5px -1px #0003,0 6px 10px #00000024,0 1px 18px #0000001f;opacity:1}.ngx-mat-color-collection .btn-color .mat-mdc-button-touch-target{display:none!important}\n"]
    }]
  }], function() {
    return [];
  }, {
    colorChanged: [{
      type: Output
    }],
    color: [{
      type: Input
    }]
  });
})();
var NgxMatColorPaletteComponent = class {
  constructor() {
    this.colorChanged = new EventEmitter();
  }
  ngOnInit() {
  }
  handleColorChanged(color) {
    this.colorChanged.emit(color);
  }
};
NgxMatColorPaletteComponent.ɵfac = function NgxMatColorPaletteComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMatColorPaletteComponent)();
};
NgxMatColorPaletteComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMatColorPaletteComponent,
  selectors: [["ngx-mat-color-palette"]],
  hostAttrs: [1, "ngx-mat-color-palette"],
  inputs: {
    color: "color",
    theme: "theme"
  },
  outputs: {
    colorChanged: "colorChanged"
  },
  decls: 2,
  vars: 3,
  consts: [[3, "colorChanged", "color", "theme"], [3, "colorChanged", "color"]],
  template: function NgxMatColorPaletteComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "ngx-mat-color-canvas", 0);
      ɵɵlistener("colorChanged", function NgxMatColorPaletteComponent_Template_ngx_mat_color_canvas_colorChanged_0_listener($event) {
        return ctx.handleColorChanged($event);
      });
      ɵɵelementEnd();
      ɵɵelementStart(1, "ngx-mat-color-collection", 1);
      ɵɵlistener("colorChanged", function NgxMatColorPaletteComponent_Template_ngx_mat_color_collection_colorChanged_1_listener($event) {
        return ctx.handleColorChanged($event);
      });
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("color", ctx.color)("theme", ctx.theme);
      ɵɵadvance();
      ɵɵproperty("color", ctx.color);
    }
  },
  dependencies: [NgxMatColorCanvasComponent, NgxMatColorCollectionComponent],
  styles: [".ngx-mat-color-palette .actions{margin-top:10px;display:flex}.ngx-mat-color-palette .actions .left{display:flex;flex-direction:column;margin-right:15px}.ngx-mat-color-palette .actions .left .preview{flex:2 1 auto;margin-bottom:10px}.ngx-mat-color-palette .actions .right{display:flex;width:60px;flex-direction:column}\n"],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatColorPaletteComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-color-palette",
      encapsulation: ViewEncapsulation$1.None,
      host: {
        "class": "ngx-mat-color-palette"
      },
      template: '<ngx-mat-color-canvas (colorChanged)="handleColorChanged($event)" [color]="color"\r\n  [theme]="theme"></ngx-mat-color-canvas>\r\n\r\n<ngx-mat-color-collection (colorChanged)="handleColorChanged($event)" [color]="color">\r\n</ngx-mat-color-collection>',
      styles: [".ngx-mat-color-palette .actions{margin-top:10px;display:flex}.ngx-mat-color-palette .actions .left{display:flex;flex-direction:column;margin-right:15px}.ngx-mat-color-palette .actions .left .preview{flex:2 1 auto;margin-bottom:10px}.ngx-mat-color-palette .actions .right{display:flex;width:60px;flex-direction:column}\n"]
    }]
  }], function() {
    return [];
  }, {
    colorChanged: [{
      type: Output
    }],
    color: [{
      type: Input
    }],
    theme: [{
      type: Input
    }]
  });
})();
var ColorAdapter = class {
  constructor() {
  }
  sameColor(a, b) {
    if (a == null && b == null) return true;
    if (a != null && b != null) return a.rgba === b.rgba;
    return false;
  }
  format(c, format) {
    return c.toString(format);
  }
  parse(value) {
    const obj = stringInputToObject(value);
    if (obj) {
      return new Color(obj.r, obj.g, obj.b, obj.a);
    }
    return null;
  }
};
ColorAdapter.ɵfac = function ColorAdapter_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ColorAdapter)();
};
ColorAdapter.ɵprov = ɵɵdefineInjectable({
  token: ColorAdapter,
  factory: ColorAdapter.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColorAdapter, [{
    type: Injectable
  }], function() {
    return [];
  }, null);
})();
var NGX_MAT_COLOR_FORMATS = {
  display: {
    colorInput: "hex"
  }
};
var MAT_COLOR_FORMATS = new InjectionToken("mat-color-formats");
var NGX_MAT_COLOR_PICKER_SCROLL_STRATEGY = new InjectionToken("ngx-mat-colorpicker-scroll-strategy");
function NGX_MAT_COLOR_PICKER_SCROLL_STRATEGY_FACTORY(overlay) {
  return () => overlay.scrollStrategies.reposition();
}
var NGX_MAT_COLOR_PICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: NGX_MAT_COLOR_PICKER_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: NGX_MAT_COLOR_PICKER_SCROLL_STRATEGY_FACTORY
};
var _MatColorpickerContentBase = mixinColor(class {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
});
var NgxMatColorPickerContentComponent = class extends _MatColorpickerContentBase {
  constructor(elementRef) {
    super(elementRef);
  }
};
NgxMatColorPickerContentComponent.ɵfac = function NgxMatColorPickerContentComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMatColorPickerContentComponent)(ɵɵdirectiveInject(ElementRef));
};
NgxMatColorPickerContentComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMatColorPickerContentComponent,
  selectors: [["ngx-mat-color-picker-content"]],
  viewQuery: function NgxMatColorPickerContentComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(NgxMatColorPaletteComponent, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._palette = _t.first);
    }
  },
  hostAttrs: [1, "ngx-mat-colorpicker-content"],
  hostVars: 3,
  hostBindings: function NgxMatColorPickerContentComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵsyntheticHostProperty("@transformPanel", "enter");
      ɵɵclassProp("ngx-mat-colorpicker-content-touch", ctx.picker.touchUi);
    }
  },
  inputs: {
    color: "color"
  },
  exportAs: ["ngxMatColorPickerContent"],
  features: [ɵɵInheritDefinitionFeature],
  decls: 1,
  vars: 2,
  consts: [[3, "colorChanged", "color", "theme"]],
  template: function NgxMatColorPickerContentComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "ngx-mat-color-palette", 0);
      ɵɵlistener("colorChanged", function NgxMatColorPickerContentComponent_Template_ngx_mat_color_palette_colorChanged_0_listener($event) {
        return ctx.picker.select($event);
      });
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("color", ctx.picker._selected)("theme", ctx.color);
    }
  },
  dependencies: [NgxMatColorPaletteComponent],
  styles: [".ngx-mat-colorpicker-content{display:block;border-radius:4px;box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f;background-color:#fff;color:#000000de;padding:16px}.ngx-mat-colorpicker-content .ngx-mat-color-palette{width:296px;height:354px}.ngx-mat-colorpicker-content-touch{display:block;max-height:80vh;overflow:auto}.ngx-mat-colorpicker-content-touch .ngx-mat-color-palette{min-width:250px;min-height:312px;max-width:750px;max-height:788px}@media all and (orientation: landscape){.mat-colorpicker-content-touch .ngx-mat-color-palette{width:64vh;height:80vh}}@media all and (orientation: portrait){.mat-colorpicker-content-touch .ngx-mat-color-palette{width:80vw;height:100vw}}\n"],
  encapsulation: 2,
  data: {
    animation: [matDatepickerAnimations.transformPanel, matDatepickerAnimations.fadeInCalendar]
  },
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatColorPickerContentComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-color-picker-content",
      host: {
        "class": "ngx-mat-colorpicker-content",
        "[@transformPanel]": '"enter"',
        "[class.ngx-mat-colorpicker-content-touch]": "picker.touchUi"
      },
      animations: [matDatepickerAnimations.transformPanel, matDatepickerAnimations.fadeInCalendar],
      exportAs: "ngxMatColorPickerContent",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      inputs: ["color"],
      template: '<ngx-mat-color-palette (colorChanged)="picker.select($event)" \r\n[color]="picker._selected"\r\n[theme]="color"></ngx-mat-color-palette>',
      styles: [".ngx-mat-colorpicker-content{display:block;border-radius:4px;box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f;background-color:#fff;color:#000000de;padding:16px}.ngx-mat-colorpicker-content .ngx-mat-color-palette{width:296px;height:354px}.ngx-mat-colorpicker-content-touch{display:block;max-height:80vh;overflow:auto}.ngx-mat-colorpicker-content-touch .ngx-mat-color-palette{min-width:250px;min-height:312px;max-width:750px;max-height:788px}@media all and (orientation: landscape){.mat-colorpicker-content-touch .ngx-mat-color-palette{width:64vh;height:80vh}}@media all and (orientation: portrait){.mat-colorpicker-content-touch .ngx-mat-color-palette{width:80vw;height:100vw}}\n"]
    }]
  }], function() {
    return [{
      type: ElementRef
    }];
  }, {
    _palette: [{
      type: ViewChild,
      args: [NgxMatColorPaletteComponent]
    }]
  });
})();
var NgxMatColorPickerComponent = class {
  constructor(_dialog, _overlay, _zone, _adapter, _dir, scrollStrategy, _document, _viewContainerRef) {
    this._dialog = _dialog;
    this._overlay = _overlay;
    this._zone = _zone;
    this._adapter = _adapter;
    this._dir = _dir;
    this._document = _document;
    this._viewContainerRef = _viewContainerRef;
    this.openedStream = new EventEmitter();
    this.closedStream = new EventEmitter();
    this._touchUi = false;
    this._opened = false;
    this._defaultColor = "primary";
    this._validSelected = null;
    this._disabledChange = new Subject();
    this._focusedElementBeforeOpen = null;
    this._inputSubscription = Subscription.EMPTY;
    this._selectedChanged = new Subject();
    this._scrollStrategy = scrollStrategy;
  }
  get disabled() {
    return this._disabled === void 0 && this._pickerInput ? this._pickerInput.disabled : !!this._disabled;
  }
  set disabled(value) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._disabled) {
      this._disabled = newValue;
      this._disabledChange.next(newValue);
    }
  }
  get touchUi() {
    return this._touchUi;
  }
  set touchUi(value) {
    this._touchUi = coerceBooleanProperty(value);
  }
  /** Whether the calendar is open. */
  get opened() {
    return this._opened;
  }
  set opened(value) {
    value ? this.open() : this.close();
  }
  /** Default Color palette to use on the datepicker's calendar. */
  get defaultColor() {
    return this._defaultColor;
  }
  set defaultColor(value) {
    this._defaultColor = value;
  }
  /** Color palette to use on the datepicker's calendar. */
  get color() {
    return this._color || (this._pickerInput ? this._pickerInput.getThemePalette() : void 0);
  }
  set color(value) {
    this._color = value;
  }
  /** The currently selected date. */
  get _selected() {
    return this._validSelected;
  }
  set _selected(value) {
    this._validSelected = value;
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    this.close();
    this._inputSubscription.unsubscribe();
    this._disabledChange.complete();
    if (this._popupRef) {
      this._popupRef.dispose();
      this._popupComponentRef = null;
    }
  }
  /** Selects the given date */
  select(nextVal) {
    let oldValue = this._selected;
    this._selected = nextVal;
    if (!this._adapter.sameColor(oldValue, this._selected)) {
      this._selectedChanged.next(nextVal);
    }
  }
  /**
  * Register an input with this datepicker.
  * @param input The datepicker input to register with this datepicker.
  */
  registerInput(input) {
    if (this._pickerInput) {
      throw Error("A ColorPicker can only be associated with a single input.");
    }
    this._pickerInput = input;
    this._inputSubscription = this._pickerInput._valueChange.subscribe((value) => this._selected = value);
  }
  open() {
    if (this._opened || this.disabled) {
      return;
    }
    if (!this._pickerInput) {
      throw Error("Attempted to open an ColorPicker with no associated input.");
    }
    if (this._document) {
      this._focusedElementBeforeOpen = this._document.activeElement;
    }
    this.touchUi ? this._openAsDialog() : this._openAsPopup();
    this._opened = true;
    this.openedStream.emit();
  }
  /** Open the calendar as a dialog. */
  _openAsDialog() {
    if (this._dialogRef) {
      this._dialogRef.close();
    }
    this._dialogRef = this._dialog.open(NgxMatColorPickerContentComponent, {
      direction: this._dir ? this._dir.value : "ltr",
      viewContainerRef: this._viewContainerRef,
      panelClass: "ngx-mat-colorpicker-dialog"
    });
    this._dialogRef.afterClosed().subscribe(() => this.close());
    this._dialogRef.componentInstance.picker = this;
    this._setColor();
  }
  /** Open the calendar as a popup. */
  _openAsPopup() {
    if (!this._portal) {
      this._portal = new ComponentPortal(NgxMatColorPickerContentComponent, this._viewContainerRef);
    }
    if (!this._popupRef) {
      this._createPopup();
    }
    if (!this._popupRef.hasAttached()) {
      this._popupComponentRef = this._popupRef.attach(this._portal);
      this._popupComponentRef.instance.picker = this;
      this._setColor();
      this._zone.onStable.asObservable().pipe(take(1)).subscribe(() => {
        this._popupRef.updatePosition();
      });
    }
  }
  /** Create the popup. */
  _createPopup() {
    const overlayConfig = new OverlayConfig({
      positionStrategy: this._createPopupPositionStrategy(),
      hasBackdrop: true,
      backdropClass: "mat-overlay-transparent-backdrop",
      direction: this._dir,
      scrollStrategy: this._scrollStrategy(),
      panelClass: "mat-colorpicker-popup"
    });
    this._popupRef = this._overlay.create(overlayConfig);
    this._popupRef.overlayElement.setAttribute("role", "dialog");
    merge(this._popupRef.backdropClick(), this._popupRef.detachments(), this._popupRef.keydownEvents().pipe(filter((event) => {
      return event.keyCode === ESCAPE || this._pickerInput && event.altKey && event.keyCode === UP_ARROW;
    }))).subscribe((event) => {
      if (event) {
        event.preventDefault();
      }
      this.close();
    });
  }
  close() {
    if (!this._opened) {
      return;
    }
    if (this._popupRef && this._popupRef.hasAttached()) {
      this._popupRef.detach();
    }
    if (this._dialogRef) {
      this._dialogRef.close();
      this._dialogRef = null;
    }
    if (this._portal && this._portal.isAttached) {
      this._portal.detach();
    }
    const completeClose = () => {
      if (this._opened) {
        this._opened = false;
        this.closedStream.emit();
        this._focusedElementBeforeOpen = null;
      }
    };
    if (this._focusedElementBeforeOpen && typeof this._focusedElementBeforeOpen.focus === "function") {
      this._focusedElementBeforeOpen.focus();
      setTimeout(completeClose);
    } else {
      completeClose();
    }
  }
  /** Passes the current theme color along to the calendar overlay. */
  _setColor() {
    const color = this.color;
    if (this._popupComponentRef) {
      this._popupComponentRef.instance.color = color;
    }
    if (this._dialogRef) {
      this._dialogRef.componentInstance.color = color;
    }
  }
  /** Create the popup PositionStrategy. */
  _createPopupPositionStrategy() {
    return this._overlay.position().flexibleConnectedTo(this._pickerInput.getConnectedOverlayOrigin()).withTransformOriginOn(".ngx-mat-colorpicker-content").withFlexibleDimensions(false).withViewportMargin(8).withLockedPosition().withPositions([{
      originX: "start",
      originY: "bottom",
      overlayX: "start",
      overlayY: "top"
    }, {
      originX: "start",
      originY: "top",
      overlayX: "start",
      overlayY: "bottom"
    }, {
      originX: "end",
      originY: "bottom",
      overlayX: "end",
      overlayY: "top"
    }, {
      originX: "end",
      originY: "top",
      overlayX: "end",
      overlayY: "bottom"
    }]);
  }
};
NgxMatColorPickerComponent.ɵfac = function NgxMatColorPickerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMatColorPickerComponent)(ɵɵdirectiveInject(MatDialog), ɵɵdirectiveInject(Overlay), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ColorAdapter), ɵɵdirectiveInject(Directionality, 8), ɵɵdirectiveInject(NGX_MAT_COLOR_PICKER_SCROLL_STRATEGY), ɵɵdirectiveInject(DOCUMENT, 8), ɵɵdirectiveInject(ViewContainerRef));
};
NgxMatColorPickerComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMatColorPickerComponent,
  selectors: [["ngx-mat-color-picker"]],
  inputs: {
    disabled: "disabled",
    touchUi: "touchUi",
    opened: "opened",
    defaultColor: "defaultColor",
    color: "color"
  },
  outputs: {
    openedStream: "opened",
    closedStream: "closed"
  },
  exportAs: ["ngxMatColorPicker"],
  decls: 0,
  vars: 0,
  template: function NgxMatColorPickerComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatColorPickerComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-color-picker",
      template: "",
      exportAs: "ngxMatColorPicker",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None
    }]
  }], function() {
    return [{
      type: MatDialog
    }, {
      type: Overlay
    }, {
      type: NgZone
    }, {
      type: ColorAdapter
    }, {
      type: Directionality,
      decorators: [{
        type: Optional
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [NGX_MAT_COLOR_PICKER_SCROLL_STRATEGY]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: ViewContainerRef
    }];
  }, {
    openedStream: [{
      type: Output,
      args: ["opened"]
    }],
    closedStream: [{
      type: Output,
      args: ["closed"]
    }],
    disabled: [{
      type: Input
    }],
    touchUi: [{
      type: Input
    }],
    opened: [{
      type: Input
    }],
    defaultColor: [{
      type: Input
    }],
    color: [{
      type: Input
    }]
  });
})();
var NgxMatColorPickerInputEvent = class {
  constructor(target, targetElement) {
    this.target = target;
    this.targetElement = targetElement;
    this.value = this.target.value;
  }
};
var MAT_COLORPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgxMatColorPickerInput),
  multi: true
};
var MAT_COLORPICKER_VALIDATORS = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => NgxMatColorPickerInput),
  multi: true
};
var NgxMatColorPickerInput = class {
  constructor(_elementRef, _formField, _colorFormats, _adapter) {
    this._elementRef = _elementRef;
    this._formField = _formField;
    this._colorFormats = _colorFormats;
    this._adapter = _adapter;
    this.colorChange = new EventEmitter();
    this.colorInput = new EventEmitter();
    this._disabledChange = new EventEmitter();
    this._valueChange = new EventEmitter();
    this._onTouched = () => {
    };
    this._cvaOnChange = () => {
    };
    this._validatorOnChange = () => {
    };
    this._pickerSubscription = Subscription.EMPTY;
    this._validator = Validators.compose([]);
    this._lastValueValid = false;
    if (!this._colorFormats) {
      throw createMissingDateImplError("MAT_COLOR_FORMATS");
    }
  }
  set ngxMatColorPicker(value) {
    if (!value) {
      return;
    }
    this._picker = value;
    this._picker.registerInput(this);
    this._pickerSubscription.unsubscribe();
    this._pickerSubscription = this._picker._selectedChanged.subscribe((selected) => {
      this.value = selected;
      this._cvaOnChange(selected);
      this._onTouched();
      this.colorInput.emit(new NgxMatColorPickerInputEvent(this, this._elementRef.nativeElement));
      this.colorChange.emit(new NgxMatColorPickerInputEvent(this, this._elementRef.nativeElement));
    });
  }
  /** Whether the colorpicker-input is disabled. */
  get disabled() {
    return !!this._disabled;
  }
  set disabled(value) {
    const newValue = coerceBooleanProperty(value);
    const element = this._elementRef.nativeElement;
    if (this._disabled !== newValue) {
      this._disabled = newValue;
      this._disabledChange.emit(newValue);
    }
    if (newValue && element.blur) {
      element.blur();
    }
  }
  /** The value of the input. */
  get value() {
    return this._value;
  }
  set value(value) {
    const oldValue = this.value;
    this._value = value;
    this._formatValue(value);
    if (!this._adapter.sameColor(oldValue, value)) {
      this._valueChange.emit(value);
    }
  }
  /** Returns the palette used by the input's form field, if any. */
  getThemePalette() {
    return this._formField ? this._formField.color : void 0;
  }
  registerOnValidatorChange(fn) {
    this._validatorOnChange = fn;
  }
  validate(c) {
    return this._validator ? this._validator(c) : null;
  }
  /**
   * @deprecated
   * @breaking-change 8.0.0 Use `getConnectedOverlayOrigin` instead
   */
  getPopupConnectionElementRef() {
    return this.getConnectedOverlayOrigin();
  }
  /**
  * Gets the element that the colorpicker popup should be connected to.
  * @return The element to connect the popup to.
  */
  getConnectedOverlayOrigin() {
    return this._formField ? this._formField.getConnectedOverlayOrigin() : this._elementRef;
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    this._pickerSubscription.unsubscribe();
    this._valueChange.complete();
    this._disabledChange.complete();
  }
  // Implemented as part of ControlValueAccessor.
  writeValue(value) {
    this.value = value;
  }
  // Implemented as part of ControlValueAccessor.
  registerOnChange(fn) {
    this._cvaOnChange = fn;
  }
  // Implemented as part of ControlValueAccessor.
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  // Implemented as part of ControlValueAccessor.
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  _onChange() {
    this.colorChange.emit(new NgxMatColorPickerInputEvent(this, this._elementRef.nativeElement));
  }
  _onKeydown(event) {
    const isAltDownArrow = event.altKey && event.keyCode === DOWN_ARROW;
    if (this._picker && isAltDownArrow && !this._elementRef.nativeElement.readOnly) {
      this._picker.open();
      event.preventDefault();
    }
  }
  /** Handles blur events on the input. */
  _onBlur() {
    if (this.value) {
      this._formatValue(this.value);
    }
    this._onTouched();
  }
  /** Formats a value and sets it on the input element. */
  _formatValue(value) {
    this._elementRef.nativeElement.value = value ? this._adapter.format(value, this._colorFormats.display.colorInput) : "";
  }
  _onInput(value) {
    const lastValueWasValid = this._lastValueValid;
    const nextValue = this._adapter.parse(value);
    if (!this._adapter.sameColor(nextValue, this._value)) {
      this._value = nextValue;
      this._cvaOnChange(nextValue);
      this._valueChange.emit(nextValue);
      this.colorInput.emit(new NgxMatColorPickerInputEvent(this, this._elementRef.nativeElement));
    } else if (lastValueWasValid !== this._lastValueValid) {
      this._validatorOnChange();
    }
  }
};
NgxMatColorPickerInput.ɵfac = function NgxMatColorPickerInput_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMatColorPickerInput)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(MatFormField, 8), ɵɵdirectiveInject(MAT_COLOR_FORMATS, 8), ɵɵdirectiveInject(ColorAdapter));
};
NgxMatColorPickerInput.ɵdir = ɵɵdefineDirective({
  type: NgxMatColorPickerInput,
  selectors: [["input", "ngxMatColorPicker", ""]],
  hostVars: 3,
  hostBindings: function NgxMatColorPickerInput_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("input", function NgxMatColorPickerInput_input_HostBindingHandler($event) {
        return ctx._onInput($event.target.value);
      })("change", function NgxMatColorPickerInput_change_HostBindingHandler() {
        return ctx._onChange();
      })("blur", function NgxMatColorPickerInput_blur_HostBindingHandler() {
        return ctx._onBlur();
      })("keydown", function NgxMatColorPickerInput_keydown_HostBindingHandler($event) {
        return ctx._onKeydown($event);
      });
    }
    if (rf & 2) {
      ɵɵhostProperty("disabled", ctx.disabled);
      ɵɵattribute("aria-haspopup", ctx._picker ? "dialog" : null)("aria-owns", (ctx._picker == null ? null : ctx._picker.opened) && ctx._picker.id || null);
    }
  },
  inputs: {
    ngxMatColorPicker: "ngxMatColorPicker",
    disabled: "disabled",
    value: "value"
  },
  outputs: {
    colorChange: "colorChange",
    colorInput: "colorInput"
  },
  exportAs: ["ngxMatColorPickerInput"],
  features: [ɵɵProvidersFeature([MAT_COLORPICKER_VALUE_ACCESSOR, MAT_COLORPICKER_VALIDATORS, {
    provide: MAT_INPUT_VALUE_ACCESSOR,
    useExisting: NgxMatColorPickerInput
  }])]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatColorPickerInput, [{
    type: Directive,
    args: [{
      selector: "input[ngxMatColorPicker]",
      providers: [MAT_COLORPICKER_VALUE_ACCESSOR, MAT_COLORPICKER_VALIDATORS, {
        provide: MAT_INPUT_VALUE_ACCESSOR,
        useExisting: NgxMatColorPickerInput
      }],
      host: {
        "[attr.aria-haspopup]": '_picker ? "dialog" : null',
        "[attr.aria-owns]": "(_picker?.opened && _picker.id) || null",
        "[disabled]": "disabled",
        "(input)": "_onInput($event.target.value)",
        "(change)": "_onChange()",
        "(blur)": "_onBlur()",
        "(keydown)": "_onKeydown($event)"
      },
      exportAs: "ngxMatColorPickerInput"
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: MatFormField,
      decorators: [{
        type: Optional
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [MAT_COLOR_FORMATS]
      }]
    }, {
      type: ColorAdapter
    }];
  }, {
    ngxMatColorPicker: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    colorChange: [{
      type: Output
    }],
    colorInput: [{
      type: Output
    }]
  });
})();
var NgxMatColorpickerToggleIcon = class {
};
NgxMatColorpickerToggleIcon.ɵfac = function NgxMatColorpickerToggleIcon_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMatColorpickerToggleIcon)();
};
NgxMatColorpickerToggleIcon.ɵdir = ɵɵdefineDirective({
  type: NgxMatColorpickerToggleIcon,
  selectors: [["", "ngxMatColorpickerToggleIcon", ""]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatColorpickerToggleIcon, [{
    type: Directive,
    args: [{
      selector: "[ngxMatColorpickerToggleIcon]"
    }]
  }], null, null);
})();
var NgxMatColorToggleComponent = class {
  constructor(_cd) {
    this._cd = _cd;
    this._stateChanges = Subscription.EMPTY;
  }
  get disabled() {
    if (this._disabled == null && this.picker) {
      return this.picker.disabled;
    }
  }
  set disabled(value) {
    this._disabled = value;
  }
  ngOnInit() {
  }
  ngOnChanges(changes) {
    if (changes["picker"]) {
      this._watchStateChanges();
    }
  }
  ngOnDestroy() {
    this._stateChanges.unsubscribe();
  }
  ngAfterContentInit() {
    this._watchStateChanges();
  }
  open(event) {
    if (this.picker && !this.disabled) {
      this.picker.open();
      event.stopPropagation();
    }
  }
  _watchStateChanges() {
    const disabled$ = this.picker ? this.picker._disabledChange : of();
    const inputDisabled$ = this.picker && this.picker._pickerInput ? this.picker._pickerInput._disabledChange : of();
    const pickerToggled$ = this.picker ? merge(this.picker.openedStream, this.picker.closedStream) : of();
    this._stateChanges.unsubscribe();
    this._stateChanges = merge(disabled$, inputDisabled$, pickerToggled$).subscribe(() => this._cd.markForCheck());
  }
};
NgxMatColorToggleComponent.ɵfac = function NgxMatColorToggleComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMatColorToggleComponent)(ɵɵdirectiveInject(ChangeDetectorRef));
};
NgxMatColorToggleComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMatColorToggleComponent,
  selectors: [["ngx-mat-color-toggle"]],
  contentQueries: function NgxMatColorToggleComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, NgxMatColorpickerToggleIcon, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._customIcon = _t.first);
    }
  },
  viewQuery: function NgxMatColorToggleComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c12, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._button = _t.first);
    }
  },
  hostAttrs: [1, "ngx-mat-color-toggle"],
  hostVars: 7,
  hostBindings: function NgxMatColorToggleComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("focus", function NgxMatColorToggleComponent_focus_HostBindingHandler() {
        return ctx._button.focus();
      });
    }
    if (rf & 2) {
      ɵɵattribute("tabindex", -1);
      ɵɵclassProp("ngx-mat-color-toggle-active", ctx.picker && ctx.picker.opened)("mat-accent", ctx.picker && ctx.picker.color === "accent")("mat-warn", ctx.picker && ctx.picker.color === "warn");
    }
  },
  inputs: {
    picker: [0, "for", "picker"],
    tabIndex: "tabIndex",
    disabled: "disabled",
    disableRipple: "disableRipple"
  },
  exportAs: ["ngxMatColorPickerToggle"],
  features: [ɵɵNgOnChangesFeature],
  ngContentSelectors: _c32,
  decls: 4,
  vars: 5,
  consts: [["button", ""], ["mat-icon-button", "", "type", "button", 3, "click", "disabled", "disableRipple"], [3, "color", 4, "ngIf"]],
  template: function NgxMatColorToggleComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵprojectionDef(_c22);
      ɵɵelementStart(0, "button", 1, 0);
      ɵɵlistener("click", function NgxMatColorToggleComponent_Template_button_click_0_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.open($event));
      });
      ɵɵtemplate(2, NgxMatColorToggleComponent_mat_icon_2_Template, 2, 2, "mat-icon", 2);
      ɵɵprojection(3);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("disabled", ctx.disabled)("disableRipple", ctx.disableRipple);
      ɵɵattribute("aria-haspopup", ctx.picker ? "dialog" : null)("tabindex", ctx.disabled ? -1 : ctx.tabIndex);
      ɵɵadvance(2);
      ɵɵproperty("ngIf", !ctx._customIcon);
    }
  },
  dependencies: [NgIf, MatIconButton, MatIcon],
  styles: [".mat-form-field-appearance .mat-form-field-prefix .ngx-mat-color-toggle-default-icon,.mat-form-field-appearance .mat-form-field-suffix .ngx-mat-color-toggle-default-icon{width:1em}.mat-form-field:not(.mat-form-field-appearance) .mat-form-field-prefix .ngx-mat-color-toggle-default-icon,.mat-form-field:not(.mat-form-field-appearance) .mat-form-field-suffix .ngx-mat-color-toggle-default-icon{display:block;width:1.5em;height:1.5em}.mat-form-field:not(.mat-form-field-appearance) .mat-form-field-prefix .mat-icon-button .ngx-mat-color-toggle-default-icon,.mat-form-field:not(.mat-form-field-appearance) .mat-form-field-suffix .mat-icon-button .ngx-mat-color-toggle-default-icon{margin:auto}\n"],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatColorToggleComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-color-toggle",
      host: {
        "class": "ngx-mat-color-toggle",
        // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
        // consumer may have provided, while still being able to receive focus.
        "[attr.tabindex]": "-1",
        "[class.ngx-mat-color-toggle-active]": "picker && picker.opened",
        "[class.mat-accent]": 'picker && picker.color === "accent"',
        "[class.mat-warn]": 'picker && picker.color === "warn"',
        "(focus)": "_button.focus()"
      },
      exportAs: "ngxMatColorPickerToggle",
      encapsulation: ViewEncapsulation$1.None,
      template: `<button #button mat-icon-button type="button" [attr.aria-haspopup]="picker ? 'dialog' : null"\r
  [attr.tabindex]="disabled ? -1 : tabIndex" [disabled]="disabled" (click)="open($event)"\r
  [disableRipple]="disableRipple">\r
\r
  <mat-icon *ngIf="!_customIcon" [style.color]="picker?._selected?.rgba">\r
    palette\r
  </mat-icon>\r
\r
  <ng-content select="[ngxMatColorpickerToggleIcon]"></ng-content>\r
\r
</button>`,
      styles: [".mat-form-field-appearance .mat-form-field-prefix .ngx-mat-color-toggle-default-icon,.mat-form-field-appearance .mat-form-field-suffix .ngx-mat-color-toggle-default-icon{width:1em}.mat-form-field:not(.mat-form-field-appearance) .mat-form-field-prefix .ngx-mat-color-toggle-default-icon,.mat-form-field:not(.mat-form-field-appearance) .mat-form-field-suffix .ngx-mat-color-toggle-default-icon{display:block;width:1.5em;height:1.5em}.mat-form-field:not(.mat-form-field-appearance) .mat-form-field-prefix .mat-icon-button .ngx-mat-color-toggle-default-icon,.mat-form-field:not(.mat-form-field-appearance) .mat-form-field-suffix .mat-icon-button .ngx-mat-color-toggle-default-icon{margin:auto}\n"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }];
  }, {
    picker: [{
      type: Input,
      args: ["for"]
    }],
    tabIndex: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    disableRipple: [{
      type: Input
    }],
    _customIcon: [{
      type: ContentChild,
      args: [NgxMatColorpickerToggleIcon]
    }],
    _button: [{
      type: ViewChild,
      args: ["button"]
    }]
  });
})();
var NgxMatColorPickerModule = class {
};
NgxMatColorPickerModule.ɵfac = function NgxMatColorPickerModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMatColorPickerModule)();
};
NgxMatColorPickerModule.ɵmod = ɵɵdefineNgModule({
  type: NgxMatColorPickerModule,
  declarations: [NgxMatColorPaletteComponent, NgxMatColorCanvasComponent, NgxMatColorCollectionComponent, NgxMatColorSliderComponent, NumericColorInputDirective, NgxMatColorPickerContentComponent, NgxMatColorPickerComponent, NgxMatColorToggleComponent, NgxMatColorpickerToggleIcon, NgxMatColorPickerInput],
  imports: [CommonModule, MatInputModule, MatButtonModule, MatCardModule, MatRadioModule, FormsModule, ReactiveFormsModule, MatDialogModule, PortalModule, MatIconModule],
  exports: [NgxMatColorToggleComponent, NgxMatColorPickerInput, NgxMatColorPickerComponent, NgxMatColorpickerToggleIcon]
});
NgxMatColorPickerModule.ɵinj = ɵɵdefineInjector({
  providers: [ColorAdapter, NGX_MAT_COLOR_PICKER_SCROLL_STRATEGY_FACTORY_PROVIDER],
  imports: [CommonModule, MatInputModule, MatButtonModule, MatCardModule, MatRadioModule, FormsModule, ReactiveFormsModule, MatDialogModule, PortalModule, MatIconModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatColorPickerModule, [{
    type: NgModule,
    args: [{
      declarations: [NgxMatColorPaletteComponent, NgxMatColorCanvasComponent, NgxMatColorCollectionComponent, NgxMatColorSliderComponent, NumericColorInputDirective, NgxMatColorPickerContentComponent, NgxMatColorPickerComponent, NgxMatColorToggleComponent, NgxMatColorpickerToggleIcon, NgxMatColorPickerInput],
      imports: [CommonModule, MatInputModule, MatButtonModule, MatCardModule, MatRadioModule, FormsModule, ReactiveFormsModule, MatDialogModule, PortalModule, MatIconModule],
      exports: [NgxMatColorToggleComponent, NgxMatColorPickerInput, NgxMatColorPickerComponent, NgxMatColorpickerToggleIcon],
      entryComponents: [NgxMatColorPickerContentComponent],
      providers: [ColorAdapter, NGX_MAT_COLOR_PICKER_SCROLL_STRATEGY_FACTORY_PROVIDER]
    }]
  }], null, null);
})();
export {
  BASIC_COLORS,
  Color,
  ColorAdapter,
  MAT_COLORPICKER_VALIDATORS,
  MAT_COLORPICKER_VALUE_ACCESSOR,
  MAT_COLOR_FORMATS,
  MAX_RGB,
  MIN_RGB,
  NGX_MAT_COLOR_FORMATS,
  NGX_MAT_COLOR_PICKER_SCROLL_STRATEGY,
  NGX_MAT_COLOR_PICKER_SCROLL_STRATEGY_FACTORY,
  NGX_MAT_COLOR_PICKER_SCROLL_STRATEGY_FACTORY_PROVIDER,
  NUMERIC_REGEX,
  NgxMatColorCanvasComponent,
  NgxMatColorCollectionComponent,
  NgxMatColorPaletteComponent,
  NgxMatColorPickerComponent,
  NgxMatColorPickerContentComponent,
  NgxMatColorPickerInput,
  NgxMatColorPickerInputEvent,
  NgxMatColorPickerModule,
  NgxMatColorSliderComponent,
  NgxMatColorToggleComponent,
  NgxMatColorpickerToggleIcon,
  NumericColorInputDirective,
  convertDecimalToHex,
  createMissingDateImplError,
  getColorAtPosition,
  matchers,
  pad2,
  rgbToHex,
  rgbaToHex,
  stringInputToObject
};
//# sourceMappingURL=@angular-material-components_color-picker.js.map
