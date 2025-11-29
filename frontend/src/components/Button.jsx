const Button = (props) => {
  const { children, ButtonType } = props
  return (
    <button
      className="bg-zinc-900 text-white rounded-xl p-2 cursor-pointer font-semibold"
      type={ButtonType}
    >
      {...children}
    </button>
  )
}

export default Button
