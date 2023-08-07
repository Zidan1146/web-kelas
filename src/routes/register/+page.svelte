<script>
  export let data;
  export let form;
  let showPassword = false;
  let formData = {
    username: '',
    password: '',
    email: '',
    choosenRole: ''
  };

  $: userCheck = {
    haveEnoughLength: formData.username.length >= 4,
    isExist: data.users.find((user) => formData.username === user.username),
    isPass() {
      return this.haveEnoughLength && !this.isExist;
    }
  };

  $: emailCheck = {
    isPass: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)
  };

  $: passwordCheck = {
    haveEnoughLength: formData.password.length >= 8,
    hasLowerCaseLetter: /[a-z]/.test(formData.password),
    hasUpperCaseLetter: /[A-Z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
    hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password),
    isPass() {
      return this.haveEnoughLength && 
      this.hasLowerCaseLetter &&
      this.hasUpperCaseLetter &&
      this.hasNumber &&
      this.hasSymbol;
    }
  };

  export const snapshot = {
    capture: () => formData,
    restore: (value) => formData = value
  }
</script>

<style>
  .main, form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .input-errors * {
    margin: 0;
    color: gray;
    font-size: 12px;
  }
</style>

<svelte:head>
  <title>Register</title>
</svelte:head>

<div class="main">
  <h2>Register a new Account</h2>
  <form action="?/register" method="POST">
    <label for="role-selection">Select a Role:</label>
    <select name="role-selection" id="role-selection" bind:value={formData.choosenRole}>
      <option value="guest">Guest</option>
      <option value="student">Student</option>
    </select>
    {#if formData.choosenRole === 'guest'}
      <label for="username">Username</label>
      <input type="text" name="username" id="username" placeholder="username" bind:value={formData.username}>
      <div class="input-errors">
        {#if !userCheck.haveEnoughLength}
          <p>Username must have at least 4 letters</p>
        {:else if userCheck.isExist}
          <p>Username {formData.username} exist!</p>
        {:else if userCheck.isPass()}
          <p>Username {formData.username} available!</p>
        {/if}
      </div>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" placeholder="email" bind:value={formData.email}>
      <div class="input-errors">
        {#if !emailCheck.isPass}
          <p>Invalid Email</p>
        {/if}
      </div>
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
      <div class="input-errors">
        {#if !passwordCheck.haveEnoughLength}
          <p>Password must have at least 8 letter</p>
        {/if}
        {#if !passwordCheck.hasLowerCaseLetter}
          <p>Password must have a lowercase letter (a-z)</p>
        {/if}
        {#if !passwordCheck.hasUpperCaseLetter}
          <p>Password must have a uppercase letter (A-Z)</p>
        {/if}
        {#if !passwordCheck.hasNumber}
          <p>Password must have a number (1-9)</p>
        {/if}
        {#if !passwordCheck.hasSymbol}
          <p>Password must have a symbol (!@#$%^&*())</p>
        {/if}
      </div>
      {#if form?.registerError}
        <p>{form.message}</p>
      {/if}
      <input type="submit" value="Register" disabled={!(userCheck.isPass() && passwordCheck.isPass() && emailCheck.isPass)}>
    {:else if formData.choosenRole === 'student'}
      <label for="username">Username</label>
      <input type="text" name="username" id="username" placeholder="username" bind:value={formData.username}>
      <div class="input-errors">
        {#if !userCheck.haveEnoughLength}
          <p>Username must have at least 4 letters</p>
        {:else if userCheck.isExist}
          <p>Username {formData.username} exist!</p>
        {:else if userCheck.isPass()}
          <p>Username {formData.username} available!</p>
        {/if}
      </div>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" placeholder="email" bind:value={formData.email}>
      <div class="input-errors">
        {#if !emailCheck.isPass}
          <p>Invalid Email</p>
        {/if}
      </div>
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
      <div class="input-errors">
        {#if !passwordCheck.haveEnoughLength}
          <p>Password must have at least 8 letter</p>
        {/if}
        {#if !passwordCheck.hasLowerCaseLetter}
          <p>Password must have a lowercase letter (a-z)</p>
        {/if}
        {#if !passwordCheck.hasUpperCaseLetter}
          <p>Password must have a uppercase letter (A-Z)</p>
        {/if}
        {#if !passwordCheck.hasNumber}
          <p>Password must have a number (1-9)</p>
        {/if}
        {#if !passwordCheck.hasSymbol}
          <p>Password must have a symbol (!@#$%^&*())</p>
        {/if}
      </div>
      <label for="student-code">Student Code</label>
      <input type="text" name="student-code" id="student-code" placeholder="student-code">
      {#if form?.registerError}
        <p>{form.message}</p>
      {/if}
      <input type="submit" value="Register" disabled={!(userCheck.isPass() && passwordCheck.isPass() && emailCheck.isPass)}>
    {/if}
    <p>Already have an account? <a href="/login">Login</a></p>
  </form>
</div>