<form action="?/register" method="post">
  <label for="username">Username:</label>
  <input type="text" name="username" id="username">
  <input type="email" name="email" id="email">
  <input type="password" name="password" id="password">
  <select name="role-selection" id="role-selection">
    <option value="nothing" selected>Nothing</option>
    <option value="guest">Guest</option>
    <option value="student">Student</option>
  </select>
  <input type="submit" value="Submit">
</form>