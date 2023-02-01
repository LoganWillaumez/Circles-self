<script lang="ts">
import Input from '../../components/Input/Input.svelte';
import type {ActionData} from './$types';
    export let form: ActionData;
</script>


<h1>Register</h1>

<form action="?/register" method="POST">
    <Input name="firstName" placeholder="Firstname"/>
    <Input name="lastName" placeholder="Lastname"/>
    <Input name="email" placeholder="Email"/>
    <Input name="password" placeholder="Password"/>
    <Input name="gender" placeholder="Gender"/>
    <button type="submit">Submit</button>
</form>