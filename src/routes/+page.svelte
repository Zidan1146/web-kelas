<form action="?/register" method="post">
  <label for="username">Username:</label>
  <input type="text" name="username" id="username" placeholder="Insert Username Here">
  <label for="email">Email:</label>
  <input type="email" name="email" id="email" placeholder="Insert Email Here">
  <label for="password">Password:</label>
  <input type="password" name="password" id="password" placeholder="Insert Password Here">
  <label for="role-selection">Select a Role</label>
  <select name="role-selection" id="role-selection">
    <option value="nothing" selected>Nothing</option>
    <option value="guest">Guest</option>
    <option value="student">Student</option>
  </select>
  <input type="submit" value="Submit">
</form>