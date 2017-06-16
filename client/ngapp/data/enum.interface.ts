export enum Priority {
    Normal, High
}

export enum Status {
    Open, Closed, Pending, Aborted, Cancelled
}

export namespace Priority {
    export function toText(val: Priority): string{
        switch (val) {
            case Priority.Normal: return "Normal";
            case Priority.High: return "High";
        }
        return `Unknown Value (Priority = ${val} )`;
    }
}


export namespace Status {
    export function toText(val: Status): string {
        switch (val) {
            case Status.Open: return "Open";
            case Status.Closed: return "Closed";
            case Status.Pending: return "Pending";
            case Status.Aborted: return "Aborted";
            case Status.Cancelled: return "Cancelled";
        }
        return `Unknown Value (Status = ${val} )`;
    }
}