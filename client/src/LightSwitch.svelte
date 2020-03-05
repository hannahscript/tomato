<style>
    .wrapper {
        border: 1px solid black;
        padding: 20px;
        margin: 10px;
    }
</style>

<script>
    import {turnLightOn, turnLightOff, getLight} from './backend';
    export let lightId;
    export let name;

    let checked;
    let lightPromise = getLight(lightId)
        .then(light => {
        console.log('Loaded initial state ', light);
             checked = light.state.on;
        })
        .catch(err => {
            checked = false;
            console.log('Error while loading state', err);
        });
    
    $: if (checked) {
        turnLightOn(lightId);
    } else {
        turnLightOff(lightId);
    }
</script>

<div class="wrapper">
    <label for="light">{name} lights</label>
    {#await lightPromise}
        <strong>?</strong>
    {:then}
        <input type="checkbox" id="light" name="light" bind:checked={checked}>
    {:catch}
        <input type="checkbox" id="light" name="light" bind:checked={checked}>
    {/await}
</div>