import { GroupBase, OptionProps, components } from "react-select"

export default function CustomOption(
  option: OptionProps<
    { value: string; src: string; label: string },
    false,
    GroupBase<{ value: any; src: string; label: any }>
  >
) {
  return (
    <components.Option {...option}>
      <div className="flex items-center space-x-2 group">
        <img
          src={`/backgrounds/${option.data.value}`}
          alt={option.data.label}
          className="w-12 md:w-40 h-auto mr-2"
        />
        <span>{option.data.label}</span>
      </div>
    </components.Option>
  )
}
