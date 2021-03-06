var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, bindingMode, children, inlineView, TemplatingEngine, computedFrom, Container, ViewCompiler, ViewSlot } from 'aurelia-framework';
import { UIDataSource } from "../../data/ui-datasource";
import { UIEvent } from "../../utils/ui-event";
import * as _ from "lodash";
let HeaderCell = class HeaderCell {
    get sortOrder() {
        if (this.ds.sortBy !== this.column.dataId)
            return '';
        return this.ds.orderBy;
    }
    doSort() {
        if (!this.column.sortable)
            return;
        if (this.ds.sortBy !== this.column.dataId)
            this.ds.sort(this.column.dataId, 'asc');
        else
            this.ds.sort(this.column.dataId, this.ds.orderBy === 'asc' ? 'desc' : 'asc');
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], HeaderCell.prototype, "ds", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], HeaderCell.prototype, "column", void 0);
__decorate([
    computedFrom('ds.sortBy', 'ds.orderBy'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], HeaderCell.prototype, "sortOrder", null);
HeaderCell = __decorate([
    autoinject(),
    inlineView(`<template class="ui-dg-cell" css.bind="{width: column.width, minWidth: column.minWidth}" click.trigger="doSort()">
  <div class="ui-dg-cell-content">\${column.headTitle}</div>
  <div class="ui-dg-cell-icon ui-sort \${sortOrder}" if.bind="column.sortable">
    <ui-glyph glyph="glyph-caret-up"></ui-glyph>
    <ui-glyph glyph="glyph-caret-down"></ui-glyph>
  </div>
  <div class="ui-dg-cell-icon ui-filter" if.bind="column.filter">
    <ui-glyph glyph="glyph-funnel"></ui-glyph>
  </div>
  <div class="ui-dg-cell-resize" if.bind="column.resizeable"></div>
</template>`)
], HeaderCell);
export { HeaderCell };
let BodyCell = class BodyCell {
    constructor(element, container, compiler) {
        this.element = element;
        this.container = container;
        this.compiler = compiler;
    }
    attached() {
        if (this.elContent.innerHTML)
            return;
        let template = '';
        if (this.column.type == 'normal')
            template = `<span class="\${column.class}" innerhtml.bind='column.getValue(record[column.dataId],record)'></span>`;
        else if (this.column.type == 'glyph')
            template = `<div title.bind="column.getTooltip(record[column.dataId],record)">
      <ui-glyph class="\${column.class}" glyph.bind="column.getGlyph(record[column.dataId],record)"></ui-glyph>
      </div>`;
        else if (this.column.type == 'link')
            template = `<a class="ui-link \${column.class} \${column.isDisabled(record[column.dataId],record)?'ui-disabled':''}" click.trigger="column.fireClick($event,record[column.dataId],record)" show.bind="column.isVisible(record[column.dataId],record)">
        <ui-glyph glyph.bind="column.getGlyph(record[column.dataId],record)" if.bind="column.glyph"></ui-glyph>
        <span innerhtml.bind="column.getLabel(record[column.dataId],record)"></span>
      </a>`;
        else if (this.column.type == 'button') {
            template = `<ui-button click.trigger="column.fireClick($event,record[column.dataId],record)" show.bind="column.isVisible(record[column.dataId],record)" theme.bind="column.getTheme(record[column.dataId],record)" small square glyph.bind="column.getGlyph(record[column.dataId],record)" width.bind="column.buttonWidth" disabled.bind="column.isDisabled(record[column.dataId],record)" dropdown.bind="column.dropdown" menuopen.trigger="column.fireMenuOpen($event, record)" label.bind="column.getLabel(record[column.dataId],record)">
      </ui-button>`;
            this.element.classList.add('btn-fix');
        }
        let viewFactory = this.compiler.compile(`<template>${template}</template>`);
        let view = viewFactory.create(this.container);
        view.bind(this);
        this.slot = new ViewSlot(this.elContent, true);
        this.slot.add(view);
        this.slot.attached();
    }
    detached() {
        if (this.slot)
            this.slot.detached();
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], BodyCell.prototype, "column", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], BodyCell.prototype, "record", void 0);
BodyCell = __decorate([
    autoinject(),
    inlineView(`<template class="ui-dg-cell" css.bind="{width: column.width, minWidth: column.minWidth}">
<div class="ui-dg-cell-content \${column.align}" ref="elContent"></div>
</template>`),
    __metadata("design:paramtypes", [Element, Container, ViewCompiler])
], BodyCell);
export { BodyCell };
let BodyRow = class BodyRow {
    constructor() {
        this.index = 0;
    }
    bind(bindingContext, overrideContext) {
        this.index = overrideContext.$index;
        this.parent = overrideContext.parentOverrideContext.bindingContext;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], BodyRow.prototype, "record", void 0);
BodyRow = __decorate([
    autoinject(),
    inlineView(`<template class="ui-dg-row \${record.__selected__?'ui-selected':''}">
<div class="ui-dg-lock-group" css.bind="{transform: 'translateX('+(parent.scrollLeft)+'px)'}">
  <div class="ui-dg-cell ui-row-head" css.bind="{width: parent.counterWidth+'px'}" if.bind="parent.rowCounter">
    <div class="ui-dg-cell-content ui-text-center">\${(index+1) + (parent.dataSource.recordsPerPage * parent.dataSource.page)}</div>
  </div>
  <div class="ui-dg-cell ui-cell-checkbox" click.trigger="parent.toggleRecordCheck($event,record)">
    <ui-glyph glyph.bind="record.__selected__?'glyph-tree-check-on':'glyph-tree-check-off'"></ui-glyph>
  </div>
  <body-cell repeat.for="column of parent.colLocked" record.bind="record" column.bind="column"></body-cell>
</div>
<body-cell repeat.for="column of parent.cols" record.bind="record" column.bind="column"></body-cell>
<div class="ui-dg-cell last-cell"><div class="ui-dg-cell-content">&nbsp;</div></div>
</template>`)
], BodyRow);
export { BodyRow };
let UIDatagrid = class UIDatagrid {
    constructor(element, engine) {
        this.element = element;
        this.engine = engine;
        this.selectedRows = [];
        this.cols = [];
        this.colHead = [];
        this.colLocked = [];
        this.counterWidth = 32;
        this.virtual = false;
        this.rowSelect = false;
        this.rowCheckbox = false;
        this.rowCounter = false;
        this.rowExpander = false;
        this.virtual = element.hasAttribute('virtual');
        this.rowSelect = element.hasAttribute('rowselect.trigger');
        this.rowCheckbox = element.hasAttribute('row-checkbox');
        this.rowCounter = element.hasAttribute('row-counter');
        this.rowExpander = element.hasAttribute('row-expander');
        if (!element.hasAttribute('scroll'))
            this.element.classList.add('ui-auto-size');
    }
    bind() {
        this.dataSourceChanged(this.dataSource);
    }
    attached() {
        UIEvent.queueTask(() => {
            this.columnsChanged(this.columns);
        });
    }
    detached() {
        if (this.obPageChange)
            this.obPageChange.dispose();
    }
    columnsChanged(columns) {
        this.colHead = _.sortBy(columns, 'locked');
        this.cols = _.flatMap(_.filter(columns, (c) => c.locked == 1), c => c.columns || c);
        this.colLocked = _.flatMap(_.filter(columns, (c) => c.locked == 0), c => c.columns || c);
    }
    dataSourceChanged(newValue) {
        if (_.isArray(newValue)) {
            const ds = new UIDataSource();
            ds.load(newValue);
            this.dataSource = ds;
        }
        this.obPageChange = UIEvent.observe(this.dataSource, 'data', () => this.selectedRows = []);
    }
    toggleRecordCheck($event, record) {
        $event.stopPropagation();
        $event.preventDefault();
        record.__selected__ = !record.__selected__;
        this.selectedRows = _.filter(this.dataSource.data, ['__selected__', true]);
    }
    fireSelect($event, record) {
        $event.stopPropagation();
        $event.preventDefault();
        if (!this.rowSelect)
            return;
        UIEvent.fireEvent('rowselect', this.element, ({ record }));
        return false;
    }
};
__decorate([
    children('ui-dg-column-group,ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph'),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "columns", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "dataSource", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "viewTpl", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.fromView }),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "selectedRows", void 0);
UIDatagrid = __decorate([
    autoinject(),
    inlineView(`<template class="ui-datagrid"><div class="ui-hide"><slot></slot></div>
<div class="ui-dg-head">
  <div class="ui-dg-row" css.bind="{transform: 'translateX('+(scrollLeft*-1)+'px)'}">
    <div class="ui-dg-lock-group" css.bind="{transform: 'translateX('+(scrollLeft)+'px)'}">
      <div class="ui-dg-cell ui-row-head" css.bind="{width: counterWidth+'px'}" if.bind="rowCounter"></div>
      <div class="ui-dg-cell ui-cell-checkbox" if.bind="rowCheckbox"></div>
      <template repeat.for="column of colHead | filter:'locked':0">
      <header-cell column.bind="column" ds.bind="dataSource" if.bind="!column.isGroup"></header-cell>
      <div class="ui-dg-col-group" if.bind="column.isGroup">
        <div class="ui-dg-col-group-title">\${column.label}</div>
        <div class="ui-dg-col-group-cells">
          <header-cell column.bind="inColumn" ds.bind="dataSource" repeat.for="inColumn of column.columns"></header-cell>
        </div>
      </div>
      </template>
    </div>
    <template repeat.for="column of colHead | filter:'locked':1">
    <header-cell column.bind="column" ds.bind="dataSource" if.bind="!column.isGroup"></header-cell>
    <div class="ui-dg-col-group" if.bind="column.isGroup">
      <div class="ui-dg-col-group-title">\${column.label}</div>
      <div class="ui-dg-col-group-cells">
        <header-cell column.bind="inColumn" repeat.for="inColumn of column.columns"></header-cell>
      </div>
    </div>
    </template>
    <div class="ui-dg-cell last-cell"><div class="ui-dg-cell-content">&nbsp;</div></div>
  </div>
</div>
<div class="ui-dg-body \${rowSelect?'ui-row-hilight':''}" scroll.trigger="scrollLeft = $event.target.scrollLeft">
  <body-row repeat.for="record of dataSource.data" record.bind="record" if.bind="!virtual" click.trigger="fireSelect($event, record)"></body-row>
  <div class="ui-dg-row ui-last-row">
    <div class="ui-dg-lock-group" css.bind="{transform: 'translateX('+(scrollLeft)+'px)'}">
      <div class="ui-dg-cell ui-row-head" css.bind="{width: counterWidth+'px'}" if.bind="rowCounter"></div>
      <div class="ui-dg-cell ui-cell-checkbox" if.bind="rowCheckbox"></div>
      <div repeat.for="column of colLocked" class="ui-dg-cell" css.bind="{width: column.width, minWidth: column.minWidth}"></div>
    </div>
    <div repeat.for="column of cols" class="ui-dg-cell" css.bind="{width: column.width, minWidth: column.minWidth}"></div>
    <div class="ui-dg-cell last-cell"></div>
  </div>
</div>
<div class="ui-dg-foot"></div>
</template>`),
    customElement('ui-datagrid'),
    __metadata("design:paramtypes", [Element, TemplatingEngine])
], UIDatagrid);
export { UIDatagrid };
