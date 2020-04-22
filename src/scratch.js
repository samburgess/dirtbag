let arr = {
    dogs:{
        dog1:{
            name: "dog1"
        },
        dog2:"dog2"
    },
    cats:{
        cat1:"cat1",
        cat2:"cat2"
    }
}

let testCallBack = (el) => el.includes("khb")

let area = ["areaName", ["loc1", "loc2"], ["route1", "route2"]]

console.log(area.filter((el) => el.includes("route1")).length===0)