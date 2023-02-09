<style lang="scss">
    .input {
        &-container {
            position: relative;
            margin: 0px;
            width: 100%;
            input {
               width: 100%;
               height: auto;
               aspect-ratio: 7/1;
               border: 1px solid black;
               border-radius: 40px;
               padding-left: 10px;
               &:focus ~ label {
                    font-size: 0.8rem;
                    top: 0%;
                    background-color: white;
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
    export let placeholder: string;
    export let name: string;
    export let required = false;
    export let type = 'text';
    export let width = '200px'
</script>


<div class="input-container" style="width: {width};">
    <input id={'input-'+name} name={name} type={type} {required} placeholder=" ">
    <label for={'input-'+name}>{placeholder}</label>
</div>