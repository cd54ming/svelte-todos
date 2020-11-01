<script>
  import { onMount } from "svelte/internal";
  import { fade } from "svelte/transition";

  // export let initText;

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let uncompltedTodos = [];
  let completedTodos = [];
  let newTodo;
  let input;
  let hoverId;

  onMount(() => {
    input.focus();
  });

  // $: newTodo = initText;
  $: storeTodos(todos);
  $: uncompltedTodos = todos.filter((todo) => !todo.done);
  $: completedTodos = todos.filter((todo) => todo.done);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    todos = [...todos, { id: Date.now(), title: newTodo, done: false }];
    newTodo = "";
  };

  const showDelete = (id) => {
    hoverId = id;
  };

  const toggleItem = (todos, idx) => {
    // todos = todos.map((elm, i) =>
    //   i === idx ? { ...elm, done: !elm.done } : elm
    // );
    todos[idx].done = !todos[idx].done;
  };

  const deleteTodo = (id) => {
    todos = todos.filter((todo) => todo.id !== id);
  };

  const storeTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button {
    border-radius: 4px;
    padding: 4px;
    cursor: pointer;
  }

  .todos {
    max-width: 600px;
    margin: auto;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 1rem;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }

  .todos-input {
    padding: 0.5rem;
    margin-bottom: 1rem;
    width: 100%;
  }

  .todos-list {
    width: 100%;
    list-style: none;
    text-align: left;
    user-select: none;
  }

  .todos-item {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    height: 46px;
  }

  .todos-item-checkbox {
    vertical-align: center;
    margin-right: 0.5rem;
  }
  .todos-item-checkbox:checked + .todos-item-title {
    color: rgba(0, 0, 0, 0.24);
  }

  .todos-item-title {
    width: 100%;
    cursor: pointer;
  }

  .todos-item-del {
    border-color: #f44336;
    color: #f44336;
    background-color: #fff;
    margin-left: auto;
  }

  .todos-remind {
    text-align: center;
    color: rgba(0, 0, 0, 0.24);
  }

  .divider {
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.24);
    margin: 6px 0;
  }
</style>

<div class="todos">
  <form on:submit|preventDefault={addTodo}>
    <input
      class="todos-input"
      type="text"
      bind:value={newTodo}
      bind:this={input}
      placeholder="Enter to add todo..." />
  </form>
  <ul class="todos-list">
    {#if uncompltedTodos.length > 0}
      {#each uncompltedTodos as todo, idx (todo.id)}
        <li class="todos-item" on:mouseover={showDelete(todo.id)}>
          <input
            on:click={toggleItem(uncompltedTodos, idx)}
            class="todos-item-checkbox"
            type="checkbox"
            bind:checked={todo.done}
            id={todo.id} />
          <label for={todo.id} class="todos-item-title">{todo.title}</label>
          {#if hoverId === todo.id}
            <button
              class="todos-item-del"
              on:click|stopPropagation={deleteTodo(todo.id)}
              in:fade={{ duration: 400 }}>delete</button>
          {/if}
        </li>
      {/each}
    {:else}
      <p class="todos-remind">you done with all tasks!</p>
    {/if}
    {#if completedTodos.length > 0}
      <hr class="divider" />
      {#each completedTodos as todo, idx (todo.id)}
        <li class="todos-item" on:mouseover={showDelete(todo.id)}>
          <input
            on:click={toggleItem(completedTodos, idx)}
            class="todos-item-checkbox"
            type="checkbox"
            bind:checked={todo.done}
            id={todo.id} />
          <label for={todo.id} class="todos-item-title">{todo.title}</label>
          {#if hoverId === todo.id}
            <button
              class="todos-item-del"
              on:click|stopPropagation={deleteTodo(todo.id)}
              in:fade={{ duration: 400 }}>delete</button>
          {/if}
        </li>
      {/each}
    {/if}
  </ul>
</div>
