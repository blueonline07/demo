function CreateArea(props) {
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        props.onCreate(e.target[0].value, e.target[1].value)
      }}>
        <input name="title" placeholder="Title" />
        <textarea name="content" placeholder="Take a note..." rows="3" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
