import React from "react";

export interface HelloFuncProps { value: string; }

export const HelloFunc = (props: HelloFuncProps) => {
    return <span>innerfunc with {props.value}</span>
}