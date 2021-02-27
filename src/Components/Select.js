import { Select, MenuItem } from "@material-ui/core";

export default function (props) {
  return props?.selectItems ? (
    <Select
      labelId="demo-simple-select-label"
      style={{ width: "100%", textAlign: "center" }}
      id="demo-simple-select"
      value={props.value}
      onChange={(e) => props.onChange(e)}
    >
      {props.selectItems.map((selectItemsValue, index) => {
        return (
          <MenuItem key={index} value={selectItemsValue}>
            {selectItemsValue}
          </MenuItem>
        );
      })}
    </Select>
  ) : null;
}
