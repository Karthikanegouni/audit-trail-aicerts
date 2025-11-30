const Button = (props) => {
  const { children, ButtonType, Disabled } = props
  return (
    <button
      className="bg-zinc-900 text-white rounded-xl p-2 cursor-pointer font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
      type={ButtonType}
      disabled={Disabled}
    >
      {...children}
    </button>
  )
}

export default Button
