<style lang="scss">
    .input {
        &-container {
            position: relative;
            margin: 0px;
            width: 100%;
            border-radius: 40px;
            &.error {
                border: 1px solid red;
            }
            input, select {
                background: var(--fill);
               width: 100%;
               height: auto;
                height: 50px;
               border-radius: 40px;
               padding-left: 10px;
               &:focus ~ label {
                    font-size: 0.8rem;
                    top: -20%;
               }
               &:not(:placeholder-shown) ~ label {
                top: 0%;
                background-color: white;
                font-size: 0.8rem;
                }
            }
            label {
                position: absolute;            
                top: 50%;
                left: 10px;
                padding: 4px;
                transform: translate(0, -50%);
                transition: top 200ms ease-in, left 200ms ease-in ,font-size 200ms ease-in;
                font-size: 1rem;
                cursor: text;
            }
        }
}   
</style>

<script lang="ts">
	import type { Options } from "../../models/input";


    export let placeholder: string;
    export let name: string;
    export let required = false;
    export let type = 'text';
    export let width = '100%';
    export let className: string;
    export let value: '';
    export let options: Options[] = [];
    export let errors = '';
    export { className as class };

    
    const typeAction = (node: any) => {
        node.type = type;
    }
</script>


{#if type !== 'select'}
<div class="input-container {className}" class:error="{errors}" style="width: {width};">
    <input bind:value="{value}" id={'input-'+name} name={name} use:typeAction {required} placeholder=" ">
    <label for={'input-'+name}>{placeholder}</label>
</div>
{:else}
<div class="input-container {className}" class:error="{errors}" style="width: {width};">
    <select bind:value="{value}" name={name} id={'input-'+name}>
        <option value="" disabled selected hidden>{placeholder}</option>
        {#each options as option}
        {#if typeof option === 'object' && 'value' in option && option.value}
            <option value={option.value}>{option.label}</option>
        {/if}
        {/each} 
    </select>
</div>
{/if}
{#if errors}
    <div class=" flex flex-col gap-0">
        {#each errors as error}
            <span class="text-red-400">{error}</span>
        {/each}
    </div>
{/if}