import { CardInputNumber } from "../../Types/InputTypes";

export default function NumberInput(props: CardInputNumber) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    props.onChange(value, props.cardInput.ref)
  }

  return (
    <div>
      <label>
        {props.cardInput.label}
        <input 
          type="number"
          name={props.cardInput.ref}
          value={props.value}
          onChange={(e) => handleChange(e)}
          />
    </label>
  </div>
  )
}