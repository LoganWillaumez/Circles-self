<style lang="scss">
    .btn{
        display: block; 
        border-radius: 50px;
        padding: 13px 30px;
        text-align: center;
        width: 100%;
        color: white;
        font-weight: 700;
        transition: background 200ms ease-in;
        position: relative;
        cursor: pointer;
        &.fill{
            background: linear-gradient(180deg, #4B5EE4 0%, #6F97F0 100%);
        }
        &.outline{
            background: transparent;
            border: 1px solid #4B5EE4;
        }
        &:hover{
            &::after{
                content: "";
                background: rgba(0, 0, 0, 0.2);
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
        }
    }
</style>

<script lang="ts">
    export let text = 'Button';
    export let type : 'fill' | 'outline' = 'fill';
</script>

<button class="btn {type}">
    {text}
</button>