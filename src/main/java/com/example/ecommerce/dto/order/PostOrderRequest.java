package com.example.ecommerce.dto.order;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostOrderRequest {

    @NotNull
    private Double totalOrderPrice;

    @NotNull
    private List<OrderItemRequest> orderItems;


}
