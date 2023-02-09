<style lang="scss">
    .signup{
        width: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        width: 100vw;
        justify-content: center;
        align-items: center;
        background-color: var(--primary-color);
    }
</style>


<script lang="ts">
	import Input from '../../components/Input.svelte';
import type {ActionData} from './$types';
    export let form: ActionData;
</script>

<div class="signup">
    <h1>Register</h1>
    <form action="?/register" method="POST">
        <Input name="firstName" placeholder="Firstname"/>
        <Input name="lastName" placeholder="Lastname"/>
        <Input name="email" placeholder="Email"/>
        <Input name="password" placeholder="Password"/>
        <Input name="gender" placeholder="Gender"/>
        <button type="submit">Submit</button>
    </form>
</div>