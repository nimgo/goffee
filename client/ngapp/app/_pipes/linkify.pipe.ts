import { Pipe, PipeTransform } from "@angular/core";
const linkifyStr = require("linkifyjs/string");

@Pipe({
    name: "linkify"
})

export class LinkifyPipe implements PipeTransform {
    transform(value: string): string {
        return value ? linkifyStr(value, { target: '_external' }) : value;
    }

}