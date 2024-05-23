import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
// import { LicenseInfo } from '@mui/x-data-grid-pro';
// LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y');

import moment from "moment";

// const ProSpan = styled("span")({
//   display: "inline-block",
//   height: "1em",
//   width: "1em",
//   verticalAlign: "middle",
//   marginLeft: "0.3em",
//   marginBottom: "0.08em",
//   backgroundSize: "contain",
//   backgroundRepeat: "no-repeat",
//   backgroundImage: "url(https://mui.com/static/x/pro.svg)",
// });

// function Label({
//   componentName,
//   valueType,
//   isProOnly,
// }: {
//   componentName: string;
//   valueType: string;
//   isProOnly?: boolean;
// }) {
//   const content = (
//     <span>
//       <strong>{componentName}</strong> for {valueType} editing
//     </span>
//   );

//   if (isProOnly) {
//     return (
//       <Stack direction="row" spacing={0.5} component="span">
//         <Tooltip title="Included on Pro package">
//           <a
//             href="https://mui.com/x/introduction/licensing/#pro-plan"
//             aria-label="Included on Pro package"
//           >
//             <ProSpan />
//           </a>
//         </Tooltip>
//         {content}
//       </Stack>
//     );
//   }

//   return content;
// }

interface Prop {
  changeParams:(start:string, end:string)=>void
}

export default function DashboadDateTimePicker({changeParams}:Prop) {
  const handelChange = (event: any) => {
    const start = moment(event[0]?.$d).format("YYYY-MM-DD");
    const end = moment(event[1]?.$d).format("YYYY-MM-DD");
    if(start && end){
      changeParams(start,end)
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangePicker"]}>
        <DemoItem component="DateRangePicker">
          <DateRangePicker
            onChange={handelChange}
            localeText={{
              start: "",
              end: "",
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
