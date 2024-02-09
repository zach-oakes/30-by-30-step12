export default class CookieUtil {
    static createCookie(id: string): void {
        // 30 minute expiration
        const expires = (new Date(Date.now() + (30 * 60 * 1000))).toUTCString();
        document.cookie = `uid=${id}; expires=${expires};path=/;`;
    }

    static getIdFromCookie(): string {
        let id = '';
        const cookie = document.cookie;

        if (cookie !== '') {
            const splitCookie = cookie.split(';');

            for (let i = 0; i < splitCookie.length; i++) {
                if (splitCookie[i].startsWith('uid=')) {
                    const nameValue = splitCookie[i].split('=');

                    // 2nd index here will be our ID
                    id = nameValue[1];
                    break;
                }
            }
        }

        return id;
    }

    static wipeCookie(): void {
        document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}