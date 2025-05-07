export const getPartyColor = (party: string | null): string => {
  if (!party) {
    return "bg-gray-700 text-white"; // Default for null party
  }

  const partyLower = party.toLowerCase();

  if (partyLower.includes("labour")) {
    return "bg-[#E4003B] text-white"; // Labour red
  } else if (partyLower.includes("conservative")) {
    return "bg-[#0087DC] text-white"; // Conservative blue
  } else if (partyLower.includes("liberal democrat")) {
    return "bg-[#FAA61A] text-black"; // Lib Dem orange/yellow
  } else if (partyLower.includes("green")) {
    return "bg-[#6AB023] text-white"; // Green Party green
  } else if (partyLower.includes("scottish national")) {
    return "bg-[#FFF95D] text-black"; // SNP yellow
  } else if (partyLower.includes("plaid cymru")) {
    return "bg-[#005B54] text-white"; // Plaid Cymru green
  } else if (partyLower.includes("democratic unionist")) {
    return "bg-[#D61921] text-white"; // DUP red
  } else if (
    partyLower.includes("sinn féin") ||
    partyLower.includes("sinn fein")
  ) {
    return "bg-[#326760] text-white"; // Sinn Féin green
  } else if (partyLower.includes("reform")) {
    return "bg-[#12B6CF] text-white"; // Reform UK teal
  } else {
    return "bg-gray-700 text-white"; // Default for other parties
  }
};
