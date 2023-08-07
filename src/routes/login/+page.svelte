<svelte:head>
    <title>Login</title>
</svelte:head>

<style>
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 98vh;
    flex-direction: column;
  }
  .error {
    color: red;
  }
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid black;
    padding: 20px;
    border-radius: 5%;
  }
  form *:not(h2, button) {
    margin-bottom: 5px;
  }
</style>

<script>
  export let form;
  let showPassword = false;
  let formData = {
    username: '',
    password: '' 
  };

  export const snapshot = {
    capture: () => formData,
    restore: (value) => formData = value
  }
</script>

<div class="main">
  <form action="?/login" method="post">
    <h2>Wellcome Back!</h2>
    <label for="username">Username/Email</label>
    <input type="text" name="username" id="username" placeholder="username/email" bind:value={formData.username}>
    <label for="password">Password</label>
    <div>
      {#if showPassword}
        <input type="text" name="password" id="password" placeholder="password" bind:value={formData.password}>
      {:else if !showPassword}
        <input type="password" name="password" id="password" placeholder="password" bind:value={formData.password}>
      {/if}
      <button on:click={() => showPassword = !showPassword} type="button">
        {showPassword ? 'Hide' : 'Show'}
      </button>
    </div>
    <input type="submit" value="Login">
    {#if form?.loginError}
      <p class="error">{form.message}</p>
    {/if}
    <p>Don't have an account? <a href="/register">Register Here</a></p>
  </form>
</div>
