/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/**
 * There are no typing definitions for the compodoc objects so we define them manually here.
 */

import { ApiParameters } from '../documentation-retriever.service';

/**
 * The root object of the compodoc autogenerated documentation (documentation.json)
 */
export interface CompodocSchema {
    components: CompodocComponent[];
    modules: CompodocModule[];
    directives: CompodocComponent[];
}

/**
 * Component description as defined in the Compodoc generated documentation JSON
 */
export interface CompodocComponent {
    name: string;
    description: string;
    sourceCode: string;
    templateUrl: string[];
    templateData: string;
    styleUrls: string[];
    styleUrlsData: StyleUrlsData[];
    inputsClass: ApiParameters[];
    outputsClass: ApiParameters[];
    file: string;
    selector: string;
}

export interface CompodocModule {
    /**
     * Name of the class that has the @NgModule() declaration
     */
    name: string;
    path: string;
    sourceCode: string;
    children: {
        type: string;
        elements: { name: string }[];
    }[];
}

export interface StyleUrlsData {
    data: string;
    styleUrl: string;
}
