function debounce(func, delay) {
    let debounceTimer
    return function() {
        console.log('a');
        const context = this;
        const args = arguments;
        
        clearTimeout(debounceTimer)
        
        debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
};

export { debounce };
