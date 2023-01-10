export default {
    props: {
        show: {
            type: Boolean,
            deafult: false
        }
    },
    methods: {
        hideDialog() {
            this.$emit('update:show', false)
        }
    },
    mounted() {
        console.log('mixin mounted')
    }
}