<script>
  import Todo from "./Todo.svelte";
  export let welcomeMessage;
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    box-sizing: border-box;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    margin-bottom: 2rem;
  }
</style>

<main>
  <h1>{welcomeMessage}</h1>
  <!-- <Todo initText="newTodo" /> -->
  <Todo />
</main>
