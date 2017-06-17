import { Status, Priority } from "./enum.interface";

export * from "./enum.interface";
export * from "./format.interface";

export class HSGroup {
    gp_ref: string;
    first_dt: Date;
    first_flow: HSFlow;
    triggers: HSTrigger[];
}

export class HSFlow {
    id: number;
    title: string;

    group_ref: string;
    summary: string;
    status: Status;
    priority: Priority;

    created_dt: Date;
    creator_id: string;
    creator: User;

    modified_dt: Date;
    modifier_id: string;
    modifier: User;

    due_dt: Date;
    deleted_dt?: Date;

    platform: Platform;
    layout: HSLayout;
    triggers?: HSTrigger[];
}

export class HSTrigger {
    id: number;
    title: string;
    subtitle: string;

    sequence: number;
    started_dt?: Date;
    deleted_dt?: Date;

    flow: HSFlow;
    actioners: HSTriggerActioner[];

    actioned_dt?: Date;
    actioner?: User;
    action: string;
}

export class HSTriggerActioner {
    trigger_id: number;
    actioner_id: string;
}

export class HSLayout {
    id: number;
    blob: string;
}

export class User {
    id: string;
    display?: string;
    email?: string;
    is_admin: boolean;
}

export class Platform {

}
