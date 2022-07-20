const UserIcon = (props) => (
  <svg height={21} width={21} xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(7 6)"
    >
      <circle cx={8.5} cy={8.5} r={12} />
      <path d="M14.5 15.5c-.662-2.274-3.2-3.025-6-3.025-2.727 0-5.27.869-6 3.025" />
      <circle cx={8.5} cy={6} r={4} />
    </g>
  </svg>
)

export default UserIcon
