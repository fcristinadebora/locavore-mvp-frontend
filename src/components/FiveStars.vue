<script setup>
const props = defineProps(['rate']);

function getStars(rating){
    const floorRate = Math.floor(rating)
    const maxStars = 5
    var starsArray = []

    // Filled stars
    for(var i = 0; i < floorRate; i++){
        const currentToRating = rating - (i + 1);
        const showHalfStar = currentToRating >= 1 ? false
            : currentToRating > 0.25
                ? true
                : false;

        if (showHalfStar) {
            starsArray.push('bi-star-half')
            continue
        }

        starsArray.push('bi-star-fill')
    }
    
    // Empty stars
    for(i = 0; i < maxStars - floorRate; i++){
        starsArray.push('bi-star')
    }

    return starsArray
}
</script>

<template>
    <span>
        <i v-for="(star, index) in getStars(props.rate)"
                        :class="star"
                    class="bi color-secondary"></i>
    </span>
</template>