export const Globals = Object.freeze({
    API_BASEURI: 'api/v1/',
});

export class HarmonyAPI {
    static GetIssuesURI() : string {
        return Globals.API_BASEURI + 'issues';
    }
}
