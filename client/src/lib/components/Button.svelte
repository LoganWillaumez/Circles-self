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
            outline-style: none;
            border: 1px solid #4B5EE4;
            color: var(--text)
        }
        &.secondary{
            background: var(--fill);
            color: var(--text);
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
    export let visual : 'fill' | 'outline' = 'fill';
    export let type: 'submit' | 'button' | 'reset' = 'button';
    export let variant : 'principal' | 'secondary' = 'principal';
    export let href = '';
    export let formaction: string = '';
    export let className: string = '';
    export let onClick: () => void = () => {};
    export { className as class };
</script>

{#if href}
    <a class="btn {visual} {className}" class:secondary="{variant === 'secondary'}" data-sveltekit-reload href="/{href}">{text}</a>
{:else}
    <button formaction={formaction} type="{type}" class="btn {visual} {className}" class:secondary="{variant === 'secondary'}" on:click={onClick}>
        {text}
    </button>
{/if}