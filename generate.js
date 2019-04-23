$(document).ready(function() {
    // scales
    const cScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    const fScale = ['F', 'G', 'A', 'A#', 'C', 'D', 'E']
    const gScale = ['G', 'A', 'B', 'C', 'D', 'E', 'F#']
    const dScale = ['D', 'E', 'F#', 'G', 'A', 'B', 'C#']
    const aScale = ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#']
    const eScale = ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#']
    const bScale = ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']

    const scales = [cScale, fScale, gScale, dScale, aScale, eScale, bScale]
    // fill scales option in generate.html
    let options = ''
    for(let i = 0; i < scales.length; i++) {
        options += '<option value="' + scales[i][0] + '">' + scales[i][0] + '</option>'
    }
    $('#selectScale').append(options)

    // create midi using the library audiosynth.js
    Synth.setVolume(0.40)
    const piano = Synth.createInstrument('piano')

    $('#btnChordGen').click(function() {
        // find which parameters the user set
        let selectedMood = $('#selectMood').find(':selected').text()
        let selectedScale = $('#selectScale').find(':selected').text()

        // find the scale they chose
        let scale
        for(let i = 0; i < scales.length; i++) {
            if(scales[i][0] === selectedScale) {
                scale = scales[i]
                break;
            }
        }

        // clear chordswrapper so notes won't keep filling after repeated clicks of the generate progression btn
        $('#chordWrapper').empty()

        // generate progression
        let generatedChords = generateProgression(scale, selectedMood)
        const chordTemplate = $('#chord-template').html().trim()
        for(let i = 0; i < generatedChords.length; i++) {
            let newChord = $(chordTemplate)
            // use custom attribute in the chord div to store notes
            $(newChord).attr('keys', generatedChords[i])
            $(newChord).find('.key').text(generatedChords[i][0])

            if(selectedMood === 'Happy') {
                $(newChord).find('.type').text('Maj')
            } else if(selectedMood === 'Sad') {
                $(newChord).find('.type').text('Min')
            }

            $('#chordWrapper').append(newChord)
        }

        // handle chord element clicking
        // when clicked, it finds the notes stored in the keys attribute and then plays them
        $('.chord').click(function() {
            let keys = $(this).attr('keys').split(',')
            for(let i = 0; i < keys.length; i++) {
                piano.play(keys[i], 4, 2)
            }
        })
    })

    function generateProgression(scale, mood) {
        let chords = []
        for(let i = 0; i < 4; i++) {
            if(mood === 'Happy') {
                chords.push(getRandomMajChord(scale))
            } else if(mood === 'Sad') {
                chords.push(getRandomMinChord(scale))
            }
        }

        return chords
    }

    function getRandomKey(scale) {
        return parseInt(Math.random() * (scale.length - 1))
    }

    function getRandomMajChord(scale) {
        let idx1 = getRandomKey(scale)
        let idx2 = idx1 + 2
        let idx3 = idx2 + 2

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

    /**
     * Still needs work, sometimes will choose second notes too close to 1st note
     */
    function getRandomMinChord(scale) {
        let idx1 = getRandomKey(scale)
        let idx2 = idx1 + 2
        let idx3 = idx2 + 2

        let key1 = scale[idx1]
        idx2 = idx2 - 1
        let key2 = scale[idx2]
        let key3 = scale[idx3]

        if(key1.split('').filter(char => key2.includes(char)).length !== 0) {
            key2 = scale[idx2 + 1]
        }

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

        if(key2 === 'E') {
            key2 = 'F'
        } else if(key2 === 'B') {
            key2 = 'C'
        } else if(key2 && !(key2.includes('#'))) {
            key2 = key2 + '#'
        }

        return [key1, key2, key3]
    }
    
})