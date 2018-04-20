package com.junjunguo.backend.models.api

import com.junjunguo.backend.models.entities.UserEntity
import java.util.*
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

data class UserModel(
    var id: Long?,
    var email: String?,
    @NotNull
    @Size(min = 3, max = 9)
    var name: String,
    var modified: Date?,
    var created: Date?,
    var uuid: UUID?
) {
    constructor(ue: UserEntity) : this(ue.id, ue.email, ue.name, ue.modified, ue.created, ue.uuid)
    constructor() : this(null, null, "", null, null, null)
}