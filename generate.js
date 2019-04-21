$(document).ready(function() {
    const piano = Synth.createInstrument('piano')
    
    // scales
    const fMaj = ['F', 'G', 'A', 'A#', 'C', 'D', 'E']
    const cMaj = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    const gMaj = ['G', 'A', 'B', 'C', 'D', 'E', 'F#']
    const dMaj = ['D', 'E', 'F#', 'G', 'A', 'B', 'C#']
    const aMaj = ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#']
    const eMaj = ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#']
    const bMaj = ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']

    const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    

    $('#btnChordGen').click(function() {
        // play random major chord in c major scale
        // get first index
        let results = generateRandomMajScale(bMaj)
        piano.play(results[0], 4, 2)
        piano.play(results[1], 4, 2)
        piano.play(results[2], 4, 2)
        console.log(results)
    })

    function getRandomKey(scale) {
        return parseInt(Math.random() * (scale.length - 1))
    }

    function generateRandomMajScale(scale) {
        let idx1 = getRandomKey(scale)
        let idx2 = idx1 + 2
        let idx3 =idx2 + 2

        let key1 = scale[idx1]
        let key2 = scale[idx2]
        let key3 = scale[idx3]

        if(key2 === undefined) {
            if(idx2 > scale.length) {
                key2 = scale[idx2 - scale.length]
            } else if(idx2 <= scale.length) {
                key2 = scale[scale.length - idx2]
            }
        }

        if(key3 === undefined) {
            if(idx3 > scale.length) {
                key3 = scale[idx3 - scale.length]
            } else if(idx3 <= scale.length) {
                key3 = scale[scale.length - idx3]
            }
        }

        return [key1, key2, key3]
    }
    
})