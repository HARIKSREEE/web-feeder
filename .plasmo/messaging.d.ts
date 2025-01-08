
import "@plasmohq/messaging"

interface MmMetadata {
	"feedData" : {}
	"getActiveTab" : {}
}

interface MpMetadata {
	
}

declare module "@plasmohq/messaging" {
  interface MessagesMetadata extends MmMetadata {}
  interface PortsMetadata extends MpMetadata {}
}
