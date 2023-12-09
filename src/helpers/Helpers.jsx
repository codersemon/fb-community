export function isPhone(phone){
    const pattern = /[0-9]/;
    return pattern.test(phone);
}