const fs = require('fs')

fs.readFile("./src/data/England-Counties.json", (err, data) => {
    if (err){
        console.error(err)
    }
    let parsedData = JSON.parse(data)
    let features = parsedData.features.map(f => {
        return {
            ...f,
            geometry: {
                ...f.geometry,
                coordinates: f.geometry.coordinates.map(poly => {
                    const mod = Math.floor(poly.length / 200)
                    const filtered = poly.filter((c, i, a)=> i%mod == 0 || i===0 || i === a.length-1)
                    // console.log("filtering polygon:", poly, "to", filtered)
                    return filtered
                })
            }
        }
    })

    // let featuresSet = features.map(f => {
    //     return {
    //         ...f,
    //         geometry: {
    //             ...f.geometry,
    //             // coordinates: [... new Set(f.geometry.coordinates), f.geometry.coordinates[0]]
    //             coordinates: f.geometry.coordinates.map(poly => {
    //                 const filtered = [...new Set(poly), poly[0]]
    //                 // console.log("filtering polygon set:", poly, "to", filtered)
    //                 return filtered
    //             })
    //         }
    //     }
    // })
    const reducedData = {
        ...parsedData,
        features: features
    }

    console.log({
        parsedData:parsedData.features[0].geometry.coordinates,
        feature:features[0].geometry.coordinates,
        // featureSet:featuresSet[0].geometry.coordinates,
        reducedData:reducedData.features[0].geometry.coordinates
    })
    fs.writeFile("./src/data/England-Counties-filtered.json", JSON.stringify(reducedData), {}, c => {
        console.log("done")
    });
})