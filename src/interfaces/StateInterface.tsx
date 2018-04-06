export default interface StateInterface {
    value: string;
    user: string;
    avatarUrl: string;
    loginName: string;
    created: string;
    followers: string;
    following: string;
    isHidden: boolean;
    publicRepos: string;
    repos: Array<{ id: number, name: string, updated_at: string, url: string }>;
}