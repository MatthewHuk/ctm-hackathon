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
                    let mod = Math.floor(poly.length / 200)
                    mod = mod > 5 ? mod : 5
                    const filtered = poly.filter((c, i, a)=> i%mod == 0 || i===0 || i === a.length-1)
                    // console.log("filtering polygon:", poly, "to", filtered)
                    for (let i = 0; i< filtered.length-2; i++){
                        const currentLine = {a: filtered[i], b: filtered[i+1]};
                        let foundintersection = 0
                        for(let j = i+2; j <i+20; j++){
                            const nextLine = {a: filtered[j%filtered.length], b: filtered[(j+1)%filtered.length]};
                            if (intersection(currentLine, nextLine)){
                                console.log("intersection found", currentLine, nextLine);
                                foundintersection = j;
                                // break;
                            }
                        }
                        if (foundintersection>0) {
                            filtered.splice(i+1, foundintersection-i-1);
                            console.log("intersection found", f.properties.ctyua16nm, i, foundintersection, filtered.length);
                        }
                    }
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

const intersection = (line1, line2) => {
    return ccw(line1.a,line2.a,line2.b) !== ccw(line1.b,line2.a,line2.b) && ccw(line1.a,line1.b,line2.a) !== ccw(line1.a,line1.b,line2.b)
}

const ccw = (A, B, C) => {
    return (C[1]-A[1]) * (B[0]-A[0]) >= (B[1]-A[1]) * (C[0]-A[0])
}