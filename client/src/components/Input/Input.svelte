<script lang="ts">
    export let placeholder: string;
    export let name: string;
    export let required = false;
    export let type = 'text';
</script>


<div>
    <label for={name}>Firstname</label>
    <input id={name} name={name} type={type} {required}>
</div>