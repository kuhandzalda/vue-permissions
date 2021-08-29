export declare class Auth {
    baseUrl: string;
    constructor(baseUrl?: string);
    $reset(url?: string): void;
    getData(url: string): Promise<any>;
    $user: () => Promise<any>;
    $roles: () => Promise<any>;
    $role: () => Promise<any>;
    $permissions: () => Promise<any>;
    userAsPermission: (permission: string) => Promise<any>;
    userAsAnyPermission: (permissions: Array<string>) => Promise<boolean>;
}
//# sourceMappingURL=auth.d.ts.map