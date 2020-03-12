/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import {
    DatagridMultiSelectFilterComponent,
    DatagridNumericFilterComponent,
    DatagridSelectFilterComponent,
    DatagridStringFilterComponent,
    FilterComponentRendererSpec,
    GridColumn,
    GridDataFetchResult,
    GridState,
    SelectOption,
    WildCardPosition,
    DatagridNumericFilter,
    DatagridStringFilter,
} from '@vcd/ui-components';
import { mockData, MockRecord } from './mock-data';

@Component({
    template: `
        <button [disabled]="!selectFilterOptions.length" (click)="removeSelectFilterOption()">Remove option</button>
        <button (click)="updateSelectFilterOptions()">Update options</button>
        <vcd-datagrid [gridData]="gridData" (gridRefresh)="refresh($event)" [columns]="columns"></vcd-datagrid>
    `,
    selector: 'vcd-datagrid-filter-example',
})
export class DatagridFilterExampleComponent {
    gridData: GridDataFetchResult<MockRecord> = {
        items: [],
    };

    selectFilterOptions: SelectOption[] = [
        {
            value: 30,
            display: 'Thirty',
        },
        {
            value: 60,
            display: 'sixty',
        },
    ];

    columns: GridColumn<MockRecord>[] = [
        {
            displayName: 'Default String filter',
            renderer: 'state',
            queryFieldName: 'state',
        },
        {
            displayName: 'String filter with wild-card',
            renderer: 'state',
            queryFieldName: 'state',
            filterRendererSpec: DatagridStringFilter(WildCardPosition.END, ''),
        },
        {
            displayName: 'Numeric filter',
            renderer: 'age',
            queryFieldName: 'age',
            filterRendererSpec: DatagridNumericFilter([1, 2]),
        },
        {
            displayName: 'Select filter with dynamic options',
            renderer: 'age',
            queryFieldName: 'age',
            filterRendererSpec: FilterComponentRendererSpec({
                type: DatagridSelectFilterComponent,
                config: {
                    options: this.selectFilterOptions,
                    value: 60,
                },
            }),
        },
        {
            displayName: 'Multi-select filter',
            renderer: 'state',
            queryFieldName: 'state',
            filterRendererSpec: FilterComponentRendererSpec({
                type: DatagridMultiSelectFilterComponent,
                config: {
                    options: [
                        {
                            value: 'CA',
                            display: 'California',
                        },
                        {
                            value: 'MA',
                            display: 'Massachusetts',
                        },
                        {
                            value: 'NC',
                            display: 'North Carolina',
                        },
                    ],
                    value: ['MA', 'NC'],
                },
            }),
        },
    ];

    removeSelectFilterOption(): void {
        if (this.selectFilterOptions.length) {
            this.selectFilterOptions.pop();
        }
    }

    updateSelectFilterOptions(): void {
        const selectFilterOptions = [
            {
                value: 'CA',
                display: 'California',
            },
            {
                value: 'MA',
                display: 'Massachusetts',
            },
            {
                value: 'NC',
                display: 'North Carolina',
            },
        ];
        // Not assigning new array, as that would result in the options inside filter component losing the reference and thereby
        // not getting any changes
        this.selectFilterOptions.length = 0;
        selectFilterOptions.forEach(option => this.selectFilterOptions.push(option));
    }

    refresh(eventData: GridState<MockRecord>): void {
        console.log(eventData.filters);
        this.gridData = {
            items: mockData,
            totalItems: 2,
        };
    }
}
