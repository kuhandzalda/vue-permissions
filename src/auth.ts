import axios from 'axios';
import cookies from 'js-cookie';

export class Auth {

    constructor(public baseUrl: string = '/auth') {
        this.baseUrl = baseUrl.charAt(baseUrl.length - 1) === '/' ?
            baseUrl.slice(0, -1) :
            baseUrl;
    }

    $reset(url?: string) {

        url ? cookies.remove(`@${this.baseUrl}/${url}`) :
        (this.$reset('user'),
            this.$reset('roles'),
            this.$reset('role'),
            this.$reset('permissions'))
        } 

        async getData(url: string) {
        const _data = cookies.get(`@${url}`) || null
        if (_data) {
            return JSON.parse(_data);
        } else {
            try {
                const { data } = await axios.get(url);
                cookies.set(`@${url}`, JSON.stringify(data), { expires: 0.3 })
                return data;
            } catch (error) {
                console.error(error);
                return null;
            }
        }

    }

    $user = async() => this.getData(`${this.baseUrl}/user`);
    $roles = async() => this.getData(`${this.baseUrl}/roles`);
    $role = async() => this.getData(`${this.baseUrl}/role`);
    $permissions = async() => this.getData(`${this.baseUrl}/permissions`);

    userAsPermission = async(permission: string) => {
        const permissions = await this.$permissions();
        return permissions.includes(permission);
    };

    userAsAnyPermission = async(permissions: Array<string>) => {
        const _permissions = await this.$permissions();
        let can = false;
        permissions.forEach((permission: string) => {
            if (_permissions.includes(permission)) {
                can = true;
                return;
            }
        });
        return can;
    }
}