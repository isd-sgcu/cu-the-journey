const OpenQrImage = (props: { borderColor: string; qrColor: string }) => (
  <div
    class="w-[46px] h-[46px] flex justify-center items-center rounded-[10px] bg-white"
    style={`border: 1px solid ${props.borderColor};box-shadow: 0px 4px 8px -2px #17171780;`}
  >
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.33333 3.33333V26.6667H26.6667V15H30V26.6667C30 28.5 28.5 30 26.6667 30H3.33333C1.48333 30 0 28.5 0 26.6667V3.33333C0 1.5 1.48333 0 3.33333 0H15V3.33333H3.33333ZM18.3333 3.33333V0H30V11.6667H26.6667V5.68333L10.2833 22.0667L7.93333 19.7167L24.3167 3.33333H18.3333Z"
        fill={props.qrColor}
      />
    </svg>
  </div>
);

export default OpenQrImage;
