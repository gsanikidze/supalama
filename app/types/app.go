package types

type SendMessage struct {
	Text string
	ID   string
	From string
}

type SendMessageResponse struct {
	Messages []SendMessage
	Context  []int
}
