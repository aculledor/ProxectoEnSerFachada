let __instance = null

export default class sampleData {
    static avatar = 'https://www.w3schools.com/w3images/avatar5.png'

    //Singleton constructor
    static instance() {
        if(__instance == null)
            __instance = new sampleData()

        return __instance
    }

}